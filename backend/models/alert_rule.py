from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import (
    String,
    INTEGER,
    DateTime,
    Boolean,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from .base import Base

class AlertRule(Base):
    __tablename__ = "alert_rules"

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
    metric_type: Mapped[str] = mapped_column(
        String(32),
        CheckConstraint(
            "metric_type IN ("
            "'request_count', 'error_count', "
            "'avg_latency_ms', 'p90_latency_ms', "
            "'p95_latency_ms', 'p99_latency_ms'"
            ")",
            name="metric_type_check",
        ),
        nullable=False,
    )
    threshold_numeric: Mapped[int] = mapped_column(INTEGER, nullable=False)
    window_minutes: Mapped[int] = mapped_column(INTEGER, nullable=False)
    is_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    project: Mapped["Project"] = relationship(#type:ignore
        "Project",
        back_populates="alert_rules",
    )
    alert_notifications: Mapped[list["AlertNotification"]] = relationship(#type:ignore
        "AlertNotification",
        back_populates="alert_rule",
    )
