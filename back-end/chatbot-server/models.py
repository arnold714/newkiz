from pydantic import BaseModel
from typing import List, Dict

class ChatHistoryRequest(BaseModel):
    newsId: str

class ChatRequest(BaseModel):
    newsId: str
    question: str

class ChatResponse(BaseModel):
    sessionId: str
    chatHistory: List[Dict[str, str]]
