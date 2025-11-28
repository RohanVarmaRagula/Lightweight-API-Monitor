from uuid import UUID
from sqlalchemy.orm import Session
from database.session import get_session
from fastapi import APIRouter, Depends, status
from services.api_event import get_events_with_project_id
from schemas.api_event import APIEventResponse

api_event_router = APIRouter(prefix="/projects")

@api_event_router.get("/{project_id}/events", response_model=list[APIEventResponse],  status_code=status.HTTP_200_OK)
def get_events_from_project_id(project_id: UUID, limit: int = 50, session: Session = Depends(get_session)):
    return {
        "events": get_events_with_project_id(
            session=session,
            project_id=project_id,
            limit=limit
            )
        }