from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Using SQLite for immediate local MVP testing out of the box. 
# For PostgreSQL: SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/tenderdb"
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tender_system.db")

# Handle SQLite connection args
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # For PostgreSQL and other databases
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
