from fastapi import APIRouter, HTTPException, status, Depends
from uuid import UUID
from sqlalchemy.orm import Session
from database.session import get_session
from schemas.metrics import HourlyMetricsResponse, MetricsResponse, CollectiveMetricsFor24HResponse
from services.metrics import get_hourly_data_from_project_id, get_data_from_project_id, get_24h_data_from_project_id

metrics_router = APIRouter(prefix="/metrics")

@metrics_router.get("/hourly_data/{project_id}", response_model=list[HourlyMetricsResponse], status_code=status.HTTP_200_OK)
def get_hourly_data(project_id: UUID, session: Session = Depends(get_session)):
    results = get_hourly_data_from_project_id(session=session, project_id=project_id)
    # if results == []:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail="No data not found for this project_id"
    #     )
    
    return results
    

@metrics_router.get("/data/{project_id}", response_model=list[MetricsResponse], status_code=status.HTTP_200_OK)
def get_data(project_id: UUID, session: Session = Depends(get_session)):
    results = get_data_from_project_id(session, project_id)
    # if not results:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail="No data not found for this project_id"
    #     )
    
    return results
    
@metrics_router.get("/collective_24h_data/{project_id}", response_model=CollectiveMetricsFor24HResponse, status_code=status.HTTP_200_OK)
def get_24h_collective_data(project_id: UUID, session: Session = Depends(get_session)):
    results = get_24h_data_from_project_id(session, project_id)
    return CollectiveMetricsFor24HResponse(**results)