from uuid import UUID
from sqlalchemy.orm import Session
from models.api_event import APIEvent
from typing import Optional

def add_event(
    session: Session, 
    project_id: UUID, 
    endpoint: str, 
    method: str, 
    status_code: int, 
    latency_ms: float,
    error: Optional[str]=None
):
    new_event = APIEvent(
        project_id=project_id,
        endpoint=endpoint,
        method=method,
        status_code=status_code,
        latency_ms=latency_ms,
        error=error
    )
    session.add(new_event)
    session.commit()
    session.refresh(new_event)
    
    return new_event