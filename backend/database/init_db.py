from models import Base
from database.engine import get_engine_from_settings

engine = get_engine_from_settings()
Base.metadata.create_all(engine)