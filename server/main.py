from dotenv import load_dotenv
from fastapi import FastAPI

from routers import embedding, chat

load_dotenv()

app = FastAPI()

app.include_router(embedding.router)
app.include_router(chat.router)
