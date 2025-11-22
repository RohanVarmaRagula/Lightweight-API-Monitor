import hashlib

def hash_password(password: str):
    hash = hashlib.sha256(password.encode("utf-8"))
    hexdigest = hash.hexdigest()    
    return hexdigest

def verify_password(password: str, hash: str):
    hexdigest = hash_password(password)
    return hexdigest == hash

if __name__ == '__main__':
    print(verify_password('rohan', hash_password('rohan')))
    print(verify_password('rohan', hash_password('roha')))