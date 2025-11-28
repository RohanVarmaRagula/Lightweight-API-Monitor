from fastapi import FastAPI
from routers.auth import auth_router
from routers.project import project_router
from routers.api_key import api_key_router
from routers.ingest import ingest_router
from routers.api_event import api_event_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to Lightweight API Monitor"}

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(api_key_router)
app.include_router(ingest_router)
app.include_router(api_event_router)