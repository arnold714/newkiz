import json
import os

from fastapi import FastAPI, Header, HTTPException, APIRouter
from uuid import uuid4
from openai import OpenAI
from dotenv import load_dotenv
from redis_client import redis_client, REDIS_TTL_SECONDS
from models import ChatHistoryRequest, ChatRequest, ChatResponse
from rag_engine import build_faiss_index, chunk_text, retrieve_similar_chunks, VECTOR_DIR
from fetch_news_data import fetch_news_data

app = FastAPI()
router = APIRouter(prefix="/api")

load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_openai(question: str, context: str) -> str:
    prompt = f"""아래 뉴스 내용을 바탕으로 사용자의 질문에 답변해줘. 다만 초등학생이 이해할 수 있도록 쉬운 말로 설명해줘. 어려운 단어나 전문 용어는 쓰지 말고, 친절하게 알려줘.

[문서 발췌]:
{context}

[질문]:
{question}

[답변]:"""

    response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()

def make_key(userId: str, newsId: str) -> str:
    return f"{userId}:{newsId}"

@router.post("/chatbot/history", response_model=ChatResponse)
async def get_or_create_chat_history(req: ChatHistoryRequest, user_id: str = Header(..., alias="User-Id")):
    redis_key = make_key(user_id, req.newsId)

    if redis_client.exists(redis_key):
        session = json.loads(redis_client.get(redis_key))
        return ChatResponse(sessionId=session["sessionId"], chatHistory=session["chatHistory"])

    session_id = str(uuid4())
    news_data = await fetch_news_data(req.newsId)
    chunks = chunk_text(f"[제목] {news_data["title"]}\n[본문] {news_data["article"]}\n[키워드] {', '.join(news_data["word_list"])}")
    vector_path = os.path.join(VECTOR_DIR, f"{user_id}_{req.newsId}")
    build_faiss_index(chunks, vector_path)

    session_data = {
        "sessionId": session_id,
        "vectorPath": vector_path,
        "chatHistory": []
    }
    redis_client.setex(redis_key, REDIS_TTL_SECONDS, json.dumps(session_data))
    return ChatResponse(sessionId=session_id, chatHistory=[])

@router.post("/chatbot", response_model=ChatResponse)
def chat(req: ChatRequest, user_id: str = Header(..., alias="User-Id")):
    redis_key = make_key(user_id, req.newsId)

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

app.include_router(router)