import os
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List


from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_chroma import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_huggingface import HuggingFaceEndpoint


router = APIRouter()


class Message(BaseModel):
    sender: str
    body: str


template = """Use the following pieces of context to answer the question at the end. If you don't know the answer,
just say that you don't know, don't try to make up an answer. Use three sentences maximum. Keep the answer as concise as possible. Always say "thanks for asking!" at the end of the answer.
{context}
Question: {question}
Helpful Answer:"""

QA_CHAIN_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template=template,
)

embeddings_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "DB")
embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

llm = HuggingFaceEndpoint(
    repo_id="HuggingFaceH4/zephyr-7b-beta",
    task="text-generation",
    max_new_tokens=512,
    do_sample=False,
    repetition_penalty=1.03,
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.vectordb = Chroma(
            persist_directory=embeddings_dir, embedding_function=embedding
        )
        self.qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=self.vectordb.as_retriever(),
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT},
        )

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        message = json.dumps({"sender": "You", "body": message})
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        res = self.qa_chain.invoke(message)
        message = json.dumps({"sender": "AI", "body": res["result"]})
        for connection in self.active_connections:
            # await connection.send_text(res["result"])
            await connection.send_text(message)


manager = ConnectionManager()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            message = Message(**data)
            await manager.send_personal_message(message.body, websocket)
            await manager.broadcast(message.body)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client left the chat")
