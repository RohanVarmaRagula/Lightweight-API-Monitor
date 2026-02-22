import os
from sqlalchemy.engine import create_engine
from sqlalchemy_utils import database_exists, create_database
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def get_engine(user, password, host, port, dbname):
    url = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}"
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url=url, echo=False)
    return engine

def get_engine_from_settings():
    keys = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'DB_NAME']
    for key in keys:
        if not os.getenv(key):
            raise Exception(f'Invalid settings: {key} missing')
    return get_engine(
        os.getenv('DB_USER'),
        os.getenv('DB_PASS'),
        os.getenv('DB_HOST'),
        os.getenv('DB_PORT'),
        os.getenv('DB_NAME')    
    )
    
