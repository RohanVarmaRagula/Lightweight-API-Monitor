from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class APIEventResponse(BaseModel):
    id: str
    project_id: str
    endpoint: str
    method: str
    status_code: int
    latency_ms: float
    timestamp: datetime
    error: Optional[str] = None

    class Config:
        from_attributes = True
