from uuid import UUID
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from models.project import Project
from typing import Optional

def create_project(session: Session, name: str, user_id: UUID, acceptable_error_rate: float = 1.00, description: str | None = None) -> Project:
    project = Project(
        name=name,
        user_id=user_id,
        acceptable_error_rate=acceptable_error_rate,
        description=description
    )
    session.add(project)
    session.commit()
    session.refresh(project)
    return project
    
def get_projects_with_user_id(session: Session, user_id: UUID) -> list[Project]:
    query = select(Project).where(Project.user_id == user_id)
    result = session.execute(query).scalars().all()
    return result

def get_project_with_name(session: Session, name: str) -> Optional[Project]:
    query = select(Project).where(Project.name == name)
    result = session.execute(query).scalar_one_or_none()
    return result

def update_acceptable_error_rate_service(session: Session, name: str, new_acceptable_error_rate: float):
    query = update(Project).where(Project.name == name).values(acceptable_error_rate = new_acceptable_error_rate)
    session.execute(query)
    session.commit()
    result = get_project_with_name(session, name)
    return result