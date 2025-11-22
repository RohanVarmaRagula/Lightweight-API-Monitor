from sqlalchemy.engine import create_engine
from sqlalchemy_utils import database_exists, create_database
from models import Base
from local_settings import postgresql as settings

def get_engine(user, password, host, port, dbname):
    url = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}"
    if not database_exists(url):
        create_database(url)
    engine = create_engine(url=url, echo=False)
    return engine

def get_engine_from_settings():
    keys = ['user', 'password', 'host', 'port', 'dbname']
    for key in keys:
        if not settings[key]:
            raise Exception(f'Invalid settings: {key} missing')
    return get_engine(settings['user'],
                      settings['password'],
                      settings['host'],
                      settings['port'],
                      settings['dbname'])
    

engine = get_engine_from_settings()
Base.metadata.create_all(engine)