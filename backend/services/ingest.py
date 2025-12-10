from uuid import UUID
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from models.api_event import APIEvent
from models.aggregated_metrics import AggregatedMetrics
from services.utils import _percentile_index

def add_event(
    session: Session, 
    project_id: UUID, 
    endpoint: str, 
    method: str, 
    status_code: int, 
    latency_ms: float,
    error: Optional[str] = None,
):
    new_event = APIEvent(
        project_id=project_id,
        endpoint=endpoint,
        method=method,
        status_code=status_code,
        latency_ms=latency_ms,
        error=error,
    )
    session.add(new_event)
    session.commit()
    session.refresh(new_event)
    return new_event


def get_events_for_hour(
    session: Session,
    project_id: UUID,
    endpoint: str,
    method: str,
    hour_bucket: datetime,
):
    """
    Events for this project/endpoint/method whose timestamp is within
    [hour_bucket, hour_bucket + 1 hour)
    """
    hour_bucket = hour_bucket.replace(minute=0, second=0, microsecond=0)
    next_hour = hour_bucket + timedelta(hours=1)

    query = (
        select(
            APIEvent.latency_ms,
            APIEvent.timestamp,
            APIEvent.status_code,
        )
        .where(
            and_(
                APIEvent.project_id == project_id,
                APIEvent.endpoint == endpoint,
                APIEvent.method == method,
                APIEvent.timestamp >= hour_bucket,
                APIEvent.timestamp < next_hour,
            )
        )
        .order_by(APIEvent.timestamp)
    )
    return session.execute(query).all()


def update_aggregated_metrics(
    session: Session,
    project_id: UUID,
    endpoint: str,
    method: str,
):
    # find the latest eevent
    latest_event_stmt = (
        select(APIEvent.timestamp)
        .where(
            and_(
                APIEvent.project_id == project_id,
                APIEvent.endpoint == endpoint,
                APIEvent.method == method,
            )
        )
        .order_by(APIEvent.timestamp.desc())
        .limit(1)
    )
    latest_ts = session.execute(latest_event_stmt).scalar_one_or_none()
    if latest_ts is None:
        return

    # make an hour bucket out of the latest event
    hour_bucket = latest_ts.replace(minute=0, second=0, microsecond=0)
    
    # get events that belong to the same hour 
    rows = get_events_for_hour(session, project_id, endpoint, method, hour_bucket)
    if not rows:
        return

    events_list = []
    for latency_ms, timestamp, status_code in rows:
        is_error = status_code >= 400
        events_list.append(
            {
                "latency_ms": float(latency_ms),
                "timestamp": timestamp,
                "is_error": is_error,
            }
        )

    # aggregate the data of that hour bucket
    events_list.sort(key=lambda e: e["latency_ms"])
    n_events = len(events_list)
    n_error = sum(1 for e in events_list if e["is_error"])
    avg_latency = sum(e["latency_ms"] for e in events_list) / n_events
    idx_90 = _percentile_index(n_events, 0.90)
    idx_95 = _percentile_index(n_events, 0.95)
    idx_99 = _percentile_index(n_events, 0.99)
    p90_latency = events_list[idx_90]["latency_ms"]
    p95_latency = events_list[idx_95]["latency_ms"]
    p99_latency = events_list[idx_99]["latency_ms"]
    error_rate = (n_error / n_events) * 100.0

    # check if that hour bucket already exists or not. If not, insert a new entry, else update.
    stmt = select(AggregatedMetrics).where(
        and_(
            AggregatedMetrics.project_id == project_id,
            AggregatedMetrics.endpoint == endpoint,
            AggregatedMetrics.method == method,
            AggregatedMetrics.hour_bucket == hour_bucket,
        )
    )
    existing = session.execute(stmt).scalar_one_or_none()

    if existing is None:
        agg = AggregatedMetrics(
            project_id=project_id,
            endpoint=endpoint,
            method=method,
            hour_bucket=hour_bucket,
            request_count=n_events,
            error_rate=error_rate,
            avg_latency_ms=avg_latency,
            p90_latency_ms=p90_latency,
            p95_latency_ms=p95_latency,
            p99_latency_ms=p99_latency,
        )
        session.add(agg)
    else:
        existing.request_count = n_events
        existing.error_rate = error_rate
        existing.avg_latency_ms = avg_latency
        existing.p90_latency_ms = p90_latency
        existing.p95_latency_ms = p95_latency
        existing.p99_latency_ms = p99_latency

    session.commit()
