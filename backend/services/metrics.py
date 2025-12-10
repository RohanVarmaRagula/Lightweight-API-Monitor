from uuid import UUID
from datetime import datetime, timedelta
from models.api_event import APIEvent
from models.aggregated_metrics import AggregatedMetrics
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from services.utils import _percentile_index

def get_hourly_data_from_project_id(session: Session, project_id: UUID):
    query = select(AggregatedMetrics).where(AggregatedMetrics.project_id == project_id)
    results = session.execute(query).scalars().all()
    return results

def get_data_from_project_id(session: Session, project_id: UUID):
    query = select(APIEvent).where(APIEvent.project_id == project_id)
    results = session.execute(query).scalars().all()
    return results

def get_24h_data_from_project_id(session: Session, project_id: UUID) -> dict:
    one_day_ago = datetime.now() - timedelta(days=1)
    query = select(APIEvent).where(
        and_(
            APIEvent.timestamp>=one_day_ago,
            APIEvent.project_id==project_id
        )
    ).order_by(APIEvent.latency_ms)
    results = session.execute(query).scalars().all()
    results = [{
        "is_error": (row.status_code >= 400),
        "latency_ms": row.latency_ms,
    } for row in results]
    
    n_events = len(results)
    if n_events == 0:
        return {
            "project_id":project_id,
            "request_count":0,
            "successful_request_count":0,
            "unsuccessful_request_count":0,
            "error_rate":0.0,
            "avg_latency_ms":0.0,
            "p90_latency_ms":0.0,
            "p95_latency_ms":0.0,
            "p99_latency_ms":0.0,
        }
        
    n_error = sum(1 for e in results if e["is_error"])
    avg_latency = sum(e["latency_ms"] for e in results) / n_events
    idx_90 = _percentile_index(n_events, 0.90)
    idx_95 = _percentile_index(n_events, 0.95)
    idx_99 = _percentile_index(n_events, 0.99)
    p90_latency = results[idx_90]["latency_ms"]
    p95_latency = results[idx_95]["latency_ms"]
    p99_latency = results[idx_99]["latency_ms"]
    error_rate = (n_error / n_events) * 100.0
    return {
        "project_id": project_id,
        "request_count": n_events,
        "successful_request_count": n_events - n_error,
        "unsuccessful_request_count": n_error,
        "error_rate": error_rate,
        "avg_latency_ms": avg_latency,
        "p90_latency_ms": p90_latency,
        "p95_latency_ms": p95_latency,
        "p99_latency_ms": p99_latency
    }