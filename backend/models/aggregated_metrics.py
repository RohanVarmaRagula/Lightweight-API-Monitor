from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, INTEGER, DateTime, ForeignKey
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
    minute_bucket: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        index=True,
        nullable=False,
    )
    request_count: Mapped[int] = mapped_column(INTEGER, nullable=False, default=0)
    error_count: Mapped[int] = mapped_column(INTEGER, nullable=False, default=0)
    avg_latency_ms: Mapped[int | None] = mapped_column(INTEGER)
    p90_latency_ms: Mapped[int | None] = mapped_column(INTEGER)
    p95_latency_ms: Mapped[int | None] = mapped_column(INTEGER)
    p99_latency_ms: Mapped[int | None] = mapped_column(INTEGER)

    project: Mapped["Project"] = relationship(#type:ignore
        "Project",
        back_populates="aggregated_metrics",
    )
