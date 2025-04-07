from pydantic import BaseModel

class News(BaseModel):
    title: str
    category: str
    article: str