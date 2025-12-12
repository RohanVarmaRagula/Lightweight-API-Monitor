from uuid import UUID
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class APIKeyStatus(str, Enum):
    ACTIVE = "ACTIVE"
    DISABLED = "DISABLED"
    EXPIRED = "EXPIRED"

class APIKeyRequest(BaseModel):
    project_id: UUID
    
class APIKeyResponse(BaseModel):
    id: UUID
    project_id: UUID
    key: str
    created_at: datetime
    status: APIKeyStatus = APIKeyStatus.ACTIVE
    
    class Config:
        from_attributes = True
        
class APIKeyResponseFromID(BaseModel):
    api_key: str
    project_name: str
    created_at: datetime
    status: str