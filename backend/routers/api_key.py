from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database.session import get_session
from schemas.api_key import APIKeyRequest, APIKeyResponse, APIKeyStatus
from services.api_key import create_api_key, get_api_keys_with_project_id, modify_api_key_status
from uuid import UUID

api_key_router = APIRouter()

@api_key_router.post("/api_key", response_model=APIKeyResponse, status_code=status.HTTP_201_CREATED)
def add_api_key(api_request: APIKeyRequest, session: Session = Depends(get_session)):
    try:
        new_api_key = create_api_key(
            session = session,
            project_id = api_request.project_id
        )
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid project_id"    
        )
    return new_api_key

@api_key_router.get("/api_key/{project_id}", response_model=list[APIKeyResponse], status_code=status.HTTP_200_OK)
def get_api_keys(project_id: UUID, session: Session = Depends(get_session)):
    api_keys = get_api_keys_with_project_id(session, project_id)
    return api_keys

@api_key_router.patch("/api_keys/{id}/enable", status_code=status.HTTP_200_OK)
def enable_api_key(id: UUID, session: Session=Depends(get_session)):
    updated = modify_api_key_status(session, id, APIKeyStatus.ACTIVE)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found",
        )
    return {"detail": "API key enabled"}
        
@api_key_router.patch("/api_keys/{id}/disable", status_code=status.HTTP_200_OK)
def disable_api_key(id: UUID, session: Session=Depends(get_session)):
    updated = modify_api_key_status(session, id, APIKeyStatus.DISABLED)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found",
        )
    return {"detail": "API key diables"}
        
@api_key_router.patch("/api_keys/{id}/expire", status_code=status.HTTP_200_OK)
def expire_api_key(id: UUID, session: Session=Depends(get_session)):
    updated = modify_api_key_status(session, id, APIKeyStatus.EXPIRED)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found",
        )
    return {"detail": "API key expired"}