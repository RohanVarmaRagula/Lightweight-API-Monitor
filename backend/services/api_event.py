from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from models.api_event import APIEvent

def get_events_with_project_id(session: Session, project_id: UUID, limit: int):
    query = select(APIEvent).where(APIEvent.project_id == project_id).order_by(APIEvent.timestamp).limit(limit)
    result = session.execute(query).scalars().all()
    return result