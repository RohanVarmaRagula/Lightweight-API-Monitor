from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from .base import Base

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    user: Mapped["User"] = relationship(
        "User",
        back_populates="projects",
    )
    api_keys: Mapped[list["APIKey"]] = relationship(
        "APIKey",
        back_populates="project",
    )
    api_events: Mapped[list["APIEvent"]] = relationship(
        "APIEvent",
        back_populates="project",
    )
    aggregated_metrics: Mapped[list["AggregatedMetrics"]] = relationship(
        "AggregatedMetrics",
        back_populates="project",
    )
    alert_rules: Mapped[list["AlertRule"]] = relationship(
        "AlertRule",
        back_populates="project",
    )
