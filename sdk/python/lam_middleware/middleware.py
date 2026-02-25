from starlette.middleware.base import BaseHTTPMiddleware
from typing import Optional
import httpx
import asyncio
import time
import warnings

INGEST_API_URL = "http://127.0.0.1:8000/ingest"

async def ingest(api_key: str, payload: dict):
    try:
        async with httpx.AsyncClient(timeout=0.5) as client:
            await client.post(
                url=INGEST_API_URL,
                json=payload,
                headers={"X-API-KEY": api_key}
            )
    except Exception:
        pass
    
class LAMWarning(UserWarning):
    pass
    
class LAMMiddleware(BaseHTTPMiddleware):
    def __init__(
        self,
        app,
        api_key: str,
        exclude_raw_paths: Optional[set[str]]=None,
        exclude_path_templates: Optional[set[str]]=None
    ):
        super().__init__(app)
        self.api_key = api_key
        self.excluded_raw_paths = exclude_raw_paths or set()
        self.excluded_path_templates = exclude_path_templates or set()
        self.warn_api_key_not_set = False

    async def dispatch(self, request, call_next):
        if not self.api_key or self.api_key == "":
            if not self.warn_api_key_not_set:
                warnings.warn(
                    message="LAM_API_KEY not set. API requests are performed, but monitoring is paused.",
                    category=LAMWarning, 
                    stacklevel=2
                )
                self.warn_api_key_not_set = True
            response = await call_next(request)
            return response
        
        start_timer = time.perf_counter()
        error = False
        status_code = 500
        try:
            response = await call_next(request)
            status_code = response.status_code
        except Exception as e:
            error = True
            raise e
        finally:
            time_taken = time.perf_counter() - start_timer
            raw_path = request.url.path
            path_template = getattr(
                request.scope.get("route"),
                "path",
                None
            )
            
            skip = False
            if raw_path in self.excluded_raw_paths or \
                path_template in self.excluded_path_templates:
                skip = True
            
            if not skip:
                if path_template is None: # work on this later => may explode the database when too many errors from user.
                    path_template = raw_path
                
                payload = {
                    "endpoint": path_template,
                    "method": request.method,
                    "status_code": status_code,
                    "latency_ms": time_taken * 1000,
                    "error":  str(error),
                }
                
                asyncio.create_task(
                    ingest(
                        api_key=self.api_key,
                        payload=payload
                    )
                )
        return response
    