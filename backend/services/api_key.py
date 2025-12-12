import secrets
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from models.api_key import APIKey
from models.project import Project
from schemas.api_key import APIKeyStatus

def create_api_key(session: Session, project_id: UUID):
    api_key = APIKey(
        project_id = project_id,
        key = secrets.token_hex(32)
    )
    session.add(api_key)
    session.commit()
    session.refresh(api_key)
    return api_key

def get_api_keys_with_project_id(session: Session, project_id: UUID):
    query = (select(
                APIKey.key.label("api_key"),
                Project.name.label("project_name"),
                APIKey.created_at.label("created_at"),
                APIKey.status.label("status")
            ).join(Project, APIKey.project_id == Project.id)
            .where(APIKey.project_id == project_id))
    result = session.execute(query).all()
    return result

def get_project_id_with_api_key(session: Session, api_key: UUID):
    query = select(APIKey.project_id).where(APIKey.key == api_key)
    result = session.execute(query).scalar_one_or_none()
    return result
 
def get_api_keys_with_user_id(session: Session, user_id: UUID):
    query = (select(
                APIKey.key.label("api_key"),
                Project.name.label("project_name"),
                APIKey.created_at.label("created_at"),
                APIKey.status.label("status")
            ).join(Project, APIKey.project_id == Project.id)
            .where(Project.user_id == user_id))
    result = session.execute(query).all()
    return result
 
def modify_api_key_status(session: Session, api_key_id: UUID, new_status: APIKeyStatus) -> bool:
    api_key = session.get(APIKey, api_key_id)
    if api_key is None:
        return False
    api_key.status = new_status
    session.commit()
    session.refresh(api_key)
    return True

def check_api_key_status(session: Session, api_key: str) -> APIKeyStatus:
    query = select(APIKey).where(APIKey.key == api_key)
    result = session.execute(query).scalar_one_or_none()
    if result is None:
        return None
    return result.status