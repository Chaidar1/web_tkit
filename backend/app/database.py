from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Debug - tapi hati-hati jangan expose password di production
print(f"Database: {DATABASE_URL}")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL tidak ditemukan di .env file!")

# Create engine
engine = create_engine(DATABASE_URL)

# Create SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()