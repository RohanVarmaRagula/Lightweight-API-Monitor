from pydantic import BaseModel, EmailStr, Field
from schemas.utils import Status

class UserRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    
class UserResponse(BaseModel):
    status: Status
    detail: str
    
class UserLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    