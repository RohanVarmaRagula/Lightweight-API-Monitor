from pydantic import BaseModel, EmailStr, Field
from schemas.utils import Status
from uuid import UUID

class UserRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    
class UserResponse(BaseModel):
    status: Status
    detail: str
    
class UserLoginResponse(BaseModel):
    user_id: UUID
    access_token: str
    token_type: str = "bearer"
    