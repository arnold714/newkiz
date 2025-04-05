import json
import os

from fastapi import FastAPI, HTTPException
from uuid import uuid4
from openai import OpenAI
from dotenv import load_dotenv
from redis_client import redis_client, REDIS_TTL_SECONDS
from models import ChatHistoryRequest, ChatRequest, ChatResponse
from rag_engine import build_faiss_index, chunk_text, retrieve_similar_chunks, VECTOR_DIR

app = FastAPI()

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_openai(question: str, context: str) -> str:
    prompt = f"""아래 문서 내용을 참고하여 사용자의 질문에 답변해 주세요.

[문서 발췌]:
{context}

[질문]:
{question}

[답변]:"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()

def make_key(userId: str, newsId: str) -> str:
    return f"{userId}:{newsId}"

@app.post("/chat/history", response_model=ChatResponse)
def get_or_create_chat_history(req: ChatHistoryRequest):
    redis_key = make_key(req.userId, req.newsId)

    if redis_client.exists(redis_key):
        session = json.loads(redis_client.get(redis_key))
        return ChatResponse(sessionId=session["sessionId"], chatHistory=session["chatHistory"])

    session_id = str(uuid4())
    chunks = chunk_text(req.body)
    vector_path = os.path.join(VECTOR_DIR, f"{req.userId}_{req.newsId}")
    build_faiss_index(chunks, vector_path)

    session_data = {
        "sessionId": session_id,
        "vectorPath": vector_path,
        "chatHistory": []
    }
    redis_client.setex(redis_key, REDIS_TTL_SECONDS, json.dumps(session_data))
    return ChatResponse(sessionId=session_id, chatHistory=[])

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    redis_key = make_key(req.userId, req.newsId)

    if not redis_client.exists(redis_key):
        raise HTTPException(status_code=404, detail="Call /chat/history first.")

    session_data = json.loads(redis_client.get(redis_key))
    vector_path = session_data["vectorPath"]
    chat_history = session_data["chatHistory"]

    retrieved = retrieve_similar_chunks(vector_path, req.question)
    context = "\n---\n".join(retrieved)

    answer = ask_openai(req.question, context)
    chat_history.append({"user": req.question, "assistant": answer})

    session_data["chatHistory"] = chat_history
    redis_client.set(redis_key, json.dumps(session_data))
    return ChatResponse(sessionId=session_data["sessionId"], chatHistory=chat_history)
