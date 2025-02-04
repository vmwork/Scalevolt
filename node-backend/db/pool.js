import os
import psycopg2
from dotenv import load_dotenv

# Load credentials from .env (like your Node.js backend)
load_dotenv("node-backend/backend-node/.env")

def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),  # AWS RDS endpoint
        port=os.getenv("DB_PORT")
    )