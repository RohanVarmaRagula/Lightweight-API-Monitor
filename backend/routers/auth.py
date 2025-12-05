from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from services.user import add_user, get_user
from database.session import get_session
from core.hash import verify_password
from core.jwt import generate_jwt
from schemas.user import UserRequest, UserResponse, UserLoginResponse
from schemas.utils import Status

auth_router = APIRouter()

@auth_router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRequest, session: Session = Depends(get_session)):
    try:
        add_user(session, user.email, user.password)
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="user already exists")
    return UserResponse(status=Status.SUCCESS, detail="user registered successfully.")
    
@auth_router.post("/login", response_model=UserLoginResponse, status_code=status.HTTP_200_OK)
def login(user: UserRequest, session: Session = Depends(get_session)) -> UserLoginResponse:
    retrieved_user = get_user(session=session, email=user.email)
    if retrieved_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User does not exist.")
    if not verify_password(user.password, retrieved_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Password incorrect.")
    token = generate_jwt(payload={"email": retrieved_user.email})
    return UserLoginResponse(user_id=retrieved_user.id, access_token=token, token_type="bearer")