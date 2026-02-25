from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, DateTime, Text, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from typing import Optional
from .base import Base

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    
    acceptable_error_rate: Mapped[float] = mapped_column(
        Float,
        default=1.00,
        nullable=False
    )

    user: Mapped["User"] = relationship(#type:ignore
        "User",
        back_populates="projects",
    )
    api_keys: Mapped[list["APIKey"]] = relationship(#type:ignore
        "APIKey",
        back_populates="project",
    )
    api_events: Mapped[list["APIEvent"]] = relationship(#type:ignore
        "APIEvent",
        back_populates="project",
    )
    aggregated_metrics: Mapped[list["AggregatedMetrics"]] = relationship(#type:ignore
        "AggregatedMetrics",
        back_populates="project",
    )
    alert_rules: Mapped[list["AlertRule"]] = relationship(#type:ignore
        "AlertRule",
        back_populates="project",
    )
