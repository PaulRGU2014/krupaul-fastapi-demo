from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Item (POST)
@app.post("/items", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = models.Item(name=item.name)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Read Items (GET)
@app.get("/items", response_model=list[schemas.Item])
def get_items(db:Session = Depends(get_db)):
    return db.query(models.Item).all()

