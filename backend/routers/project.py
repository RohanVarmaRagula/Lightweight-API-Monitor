from fastapi import APIRouter, Depends, status, HTTPException, Query
from schemas.project import ProjectRequest, ProjectResponse
from services.project import create_project, get_project_with_name, get_projects_with_user_id, update_acceptable_error_rate_service
from database.session import get_session
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from uuid import UUID

project_router = APIRouter()

@project_router.post("/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def add_project(project: ProjectRequest, session: Session = Depends(get_session)):
    try:
        project = create_project(
            session=session, 
            name=project.name, 
            user_id=project.user_id, 
            acceptable_error_rate=project.acceptable_error_rate,
            description=project.description
        )
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="project already exists"
        )

    return project
    
@project_router.get("/projects/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def get_project_by_name(name: str, session: Session = Depends(get_session)):
    project = get_project_with_name(session, name)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with name '{name}' not found"
        )
    return project

@project_router.get("/projects/user/{user_id}", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK)
def get_project_by_user_id(user_id: UUID, session: Session = Depends(get_session)):
    projects = get_projects_with_user_id(session, user_id)
    return projects

@project_router.patch("/projects/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def update_acceptable_error_rate(name: str, new_acceptable_error_rate: float = Query(...), session: Session = Depends(get_session)):
    project = update_acceptable_error_rate_service(session, name, new_acceptable_error_rate)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with name '{name}' not found"
        )
    return project
