from sqlalchemy.orm import sessionmaker
from database.engine import get_engine_from_settings

engine = get_engine_from_settings()
LocalSession = sessionmaker(
    bind = engine,
    autoflush = False,
    autocommit = False
)

def get_session():
    session = LocalSession()
    try:
        yield session
    finally:
        session.close()