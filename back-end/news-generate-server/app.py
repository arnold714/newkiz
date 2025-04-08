from fastapi import FastAPI
from model.news_model import News
from pipeline import generate_news_pipeline

app = FastAPI()


@app.post("/api/news/generate")
async def news_generate(news: News):
    result = await generate_news_pipeline(news)
    return {
        "success": True,
        "data": result
    }