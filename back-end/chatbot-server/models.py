from pydantic import BaseModel
from typing import List, Dict

class ChatHistoryRequest(BaseModel):
    userId: str
    newsId: str
    title: str
    body: str
    keywords: List[str]

class ChatRequest(BaseModel):
    userId: str
    newsId: str
    question: str

class ChatResponse(BaseModel):
    sessionId: str
    chatHistory: List[Dict[str, str]]
