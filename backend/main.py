from fastapi import FastAPI
from routers.auth import auth_router
from routers.project import project_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to Lightweight API Monitor"}

app.include_router(auth_router)
app.include_router(project_router)