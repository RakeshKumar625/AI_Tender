from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Using SQLite for immediate local MVP testing out of the box. 
# For PostgreSQL: SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/tenderdb"
SQLALCHEMY_DATABASE_URL = "sqlite:///./tender_system.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
