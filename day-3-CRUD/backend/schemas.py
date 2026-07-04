from pydantic import BaseModel


class ItemCreate(BaseModel):
    name: str


class ItemUpdate(BaseModel):
    name: str


class Item(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}

class UserCreate(BaseModel):
    username: str
    password: str
    
class User(BaseModel):
    id: int
    username: str

    model_config = {"from_attributes": True}
    
class Token(BaseModel):
    access_token: str
    token_type: str