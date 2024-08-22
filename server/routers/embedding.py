import os

from typing import Annotated
from fastapi import APIRouter, HTTPException, Form

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

router = APIRouter(
    prefix="/embedding",
    tags=["chat"],
)


@router.get("/")
async def create_embeddings():
    try:
        pdf_path = os.path.join("pdfs", "MLBOOK.pdf")
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            separators=["\n\n", "\n", " ", ""],
        )
        docs = text_splitter.split_documents(documents)

        embedding_function = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

        embeddings_dir = pdf_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)), "DB"
        )
        db = Chroma.from_documents(
            docs, embedding_function, persist_directory=embeddings_dir
        )

        return {"message": "Embeddings created"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/similarity-search")
async def similarity_search(query: Annotated[str, Form()]):
    embeddings_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "DB")

    embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    vectordb = Chroma(persist_directory=embeddings_dir, embedding_function=embedding)

    res = vectordb.similarity_search(query, k=2)

    return {"result": res}
