import jwt
import os
from datetime import datetime, timedelta
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def generate_jwt(payload: dict):
    to_encode = payload.copy()
    to_encode["exp"] = datetime.now() + timedelta(hours=1)
    token = jwt.encode(
            payload = to_encode,
            key = os.getenv("JWT_SECRET_KEY"),
            algorithm = "HS256"
        )
    return token
    
def verify_jwt(token: str):
    try:
        payload = jwt.decode(
            token,
            os.getenv("JWT_SECRET_KEY"),
            algorithms = ["HS256"]
        )
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token timed out"}
    except jwt.InvalidTokenError:
        return {"error": "Token invalid"}
    
if __name__ == "__main__":
    payload = {
        "email": "rohanvarmaragula@gmail.com",        
    }
    token = generate_jwt(payload)
    print(token)
    print(verify_jwt(token))