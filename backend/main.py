from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import auth_router
from routers.project import project_router
from routers.api_key import api_key_router
from routers.ingest import ingest_router
from routers.api_event import api_event_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def root():
    return {"message": "Welcome to Lightweight API Monitor"}

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(api_key_router)
app.include_router(ingest_router)
app.include_router(api_event_router)