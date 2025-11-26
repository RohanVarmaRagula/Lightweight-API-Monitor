from pydantic import BaseModel
from enum import Enum

class Status(str, Enum):
    SUCCESS = "success"
    FAIL = "fail"
