from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


@router.get("/")
async def chat():
    print("===================")
    return {"name": "The great Plumbus"}
