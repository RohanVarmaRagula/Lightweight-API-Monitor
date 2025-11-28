from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database.session import get_session
from schemas.ingest import IngestRequest, IngestResponse
from schemas.api_key import APIKeyStatus
from services.api_key import check_api_key_status, get_project_id_with_api_key
from services.ingest import add_event

ingest_router = APIRouter()

@ingest_router.post("/ingest", response_model=IngestResponse, status_code=status.HTTP_202_ACCEPTED)
def ingest_data(ingest_req: IngestRequest, session: Session = Depends(get_session)):
    api_key_status = check_api_key_status(session, ingest_req.api_key)
    if api_key_status is None:
        HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                     detail="API Key not found")
    if api_key_status == APIKeyStatus.EXPIRED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="API Key expired")
    elif api_key_status == APIKeyStatus.DISABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="API Key disabled")
    project_id = get_project_id_with_api_key(session, api_key=ingest_req.api_key)
    
    try:
        add_event(
            session=session,
            project_id=project_id,
            endpoint=ingest_req.endpoint,
            method=ingest_req.method,
            status_code=ingest_req.status_code,
            latency_ms=ingest_req.latency_ms,
            error=ingest_req.error
        )
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project_id does not exist"
        )
    return IngestResponse(detail="Ingest successful")
    
    