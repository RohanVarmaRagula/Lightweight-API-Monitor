from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, INTEGER, DateTime, ForeignKey, FLOAT
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class AggregatedMetrics(Base):
    __tablename__ = "aggregated_metrics"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("projects.id"),
        nullable=False,
    )
    endpoint: Mapped[str] = mapped_column(String(255), nullable=False)
    method: Mapped[str] = mapped_column(String(16), nullable=False)
    hour_bucket: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        index=True,
        nullable=False,
    )
    request_count: Mapped[int] = mapped_column(INTEGER, nullable=False, default=0)
    error_rate: Mapped[float] = mapped_column(FLOAT, nullable=False, default=0.0)
    avg_latency_ms: Mapped[float | None] = mapped_column(FLOAT)
    p90_latency_ms: Mapped[float | None] = mapped_column(FLOAT)
    p95_latency_ms: Mapped[float | None] = mapped_column(FLOAT)
    p99_latency_ms: Mapped[float | None] = mapped_column(FLOAT)

    project: Mapped["Project"] = relationship(#type:ignore
        "Project",
        back_populates="aggregated_metrics",
    )
