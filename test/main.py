from fastapi import FastAPI
from lam_middleware import LAMMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    LAMMiddleware,
    api_key=os.getenv("LAM_API_KEY")
)

@app.get("/users")
def get_users():
    return {"users":[]}