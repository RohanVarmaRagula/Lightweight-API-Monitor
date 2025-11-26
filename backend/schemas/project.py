from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime

class ProjectRequest(BaseModel):
    name: str
    user_id: uuid.UUID
    description: Optional[str]

class ProjectResponse(BaseModel):
    id: uuid.UUID
    name: str
    user_id: uuid.UUID
    description: Optional[str]
    created_at: datetime
    
    class Config:
        orm_mode = True