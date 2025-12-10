from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict

class HourlyMetricsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    project_id: UUID
    endpoint: str
    method: str
    hour_bucket: datetime
    request_count: int
    error_rate: float
    avg_latency_ms: float
    p90_latency_ms: float
    p95_latency_ms: float
    p99_latency_ms: float

class MetricsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    project_id: UUID
    endpoint: str
    method: str
    status_code: int
    latency_ms: float
    timestamp: datetime

class CollectiveMetricsFor24HResponse(BaseModel):
    project_id: UUID
    request_count: int
    successful_request_count: int
    unsuccessful_request_count: int
    error_rate: float
    avg_latency_ms: float
    p90_latency_ms: float
    p95_latency_ms: float
    p99_latency_ms: float
