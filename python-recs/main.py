from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal

app = FastAPI()

# Input schema example (adjust to your data)
class RecommendationRequest(BaseModel):
    user_id: str
    context: dict = None  # e.g., item viewed, or other data

# Output schema example
class RecommendationResponse(BaseModel):
    recommendations: list


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        
@app.post("/recommendations", response_model=RecommendationResponse)
def get_recommendations(req: RecommendationRequest):
    user_id = req.user_id

    # TODO: Use your recommendation logic here
    # For now, we'll just return dummy recommendations
    recommended_items = ["product_1", "product_2", "product_3"]

    return RecommendationResponse(recommendations=recommended_items)


