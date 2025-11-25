from __future__ import annotations
from datetime import datetime
import uuid
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from .base import Base

class AlertNotification(Base):
    __tablename__ = "alert_notifications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    alert_rule_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("alert_rules.id"),
        nullable=False,
    )
    triggered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    message_text: Mapped[str] = mapped_column(
        String,
        nullable=False,
        server_default=(
            "This email is to notify you that your API endpoint(s) is/are facing "
            "issues. Check out your project dashboard in our website for more details."
        ),
    )

    alert_rule: Mapped["AlertRule"] = relationship( #type:ignore
        "AlertRule",
        back_populates="alert_notifications",
    )
