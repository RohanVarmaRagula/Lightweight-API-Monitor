import secrets
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select
from models.api_key import APIKey
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
    query = select(APIKey).where(APIKey.project_id == project_id)
    result = session.execute(query).scalars().all()
    return result
 
def modify_api_key_status(session: Session, api_key_id: UUID, new_status: APIKeyStatus) -> bool:
    api_key = session.get(APIKey, api_key_id)
    if api_key is None:
        return False
    api_key.status = new_status
    session.commit()
    session.refresh(api_key)
    return True
