from sqlalchemy import select, insert
from models.user import User
from sqlalchemy.orm import Session
from core.hash import get_hash

def user_exists(session: Session, email: str):
    query = select(User).where(User.email == email)
    return session.execute(query).scalar_one_or_none() is not None
           
def add_user(session: Session, email: str, password: str) -> User:
    password_hash = get_hash(password)
    user = User(email=email, password_hash=password_hash)
    session.add(user)
    session.commit() ### throws integrityerror if already existing user is added again as user model says email should be unique.
    session.refresh(user)
    return user

def get_user(session: Session, email: str) -> User:
    query = select(User).where(User.email == email)
    result = session.execute(query).scalar_one_or_none()
    return result