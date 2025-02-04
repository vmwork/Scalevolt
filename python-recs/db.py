# db.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# .env aws
DB_HOST=database-1.cx6g2gyye2iq.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Keepongrinding7
DB_NAME=database-1


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Optionally define a Base if you're using SQLAlchemy's ORM
# from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()
