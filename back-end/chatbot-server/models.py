from pydantic import BaseModel
from typing import List

class NewsInput(BaseModel):
    user_id: str
    news_id: str
    title: str
    body: str
    keywords: List[str]

class QuestionInput(BaseModel):
    session_id: str
    question: str
