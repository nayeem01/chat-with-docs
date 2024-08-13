from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# from app.services.langchain_service import get_answer

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    answer: str


@router.get("/")
async def chat():
    print("===================")
    return {"name": "The great Plumbus"}
