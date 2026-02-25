from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime

class ProjectRequest(BaseModel):
    name: str
    user_id: uuid.UUID
    acceptable_error_rate: float
    description: Optional[str]

class ProjectResponse(BaseModel):
    id: uuid.UUID
    name: str
    user_id: uuid.UUID
    acceptable_error_rate: float
    description: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True