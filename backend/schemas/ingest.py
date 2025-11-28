from pydantic import BaseModel
from typing import Optional

class IngestRequest(BaseModel):
    api_key: str
    endpoint: str
    method: str
    status_code: int
    latency_ms: float
    error: Optional[str] = None

class IngestResponse(BaseModel):
    detail: str