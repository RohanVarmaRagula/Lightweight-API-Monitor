import hashlib

def get_hash(password: str):
    hash = hashlib.sha256(password.encode("utf-8"))
    hexdigest = hash.hexdigest()    
    return hexdigest

def verify_password(password: str, hash: str):
    hexdigest = get_hash(password)
    return hexdigest == hash
