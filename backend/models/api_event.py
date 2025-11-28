from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, INTEGER, DateTime, ForeignKey, Text, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from typing import Optional
from .base import Base

class APIEvent(Base):
    __tablename__ = "api_events"

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
    status_code: Mapped[int] = mapped_column(INTEGER, nullable=False)
    latency_ms: Mapped[float] = mapped_column(Float, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )
    error: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )

    project: Mapped["Project"] = relationship(#type:ignore
        "Project",
        back_populates="api_events",
    )
