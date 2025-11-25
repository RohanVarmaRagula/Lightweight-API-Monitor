import jwt
from datetime import datetime, timedelta
from core.config import jwt_secret_key

def generate_jwt(payload: dict):
    to_encode = payload.copy()
    to_encode["exp"] = datetime.now() + timedelta(hours=1)
    token = jwt.encode(
            payload = to_encode,
            key = jwt_secret_key,
            algorithm = "HS256"
        )
    return token
    
def verify_jwt(token: str):
    try:
        payload = jwt.decode(
            token,
            jwt_secret_key,
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