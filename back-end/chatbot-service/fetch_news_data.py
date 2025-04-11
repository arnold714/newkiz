import os
import httpx
from typing import List
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

NEWS_SERVICE_URL = os.getenv("NEWS_SERVICE_URL")

async def fetch_news_data(newsId: str) -> dict:
    async with httpx.AsyncClient() as client:
        headers = {
            "User-Id": "0"  # 로그 저장을 피하기 위해서 User-Id: 0 사용
        }
        response = await client.get(NEWS_SERVICE_URL + "/api/news/" + newsId, headers=headers)
        response.raise_for_status()

        data = response.json()
        if not data.get("success"):
            raise ValueError("API 응답 실패")

        article_data = data["data"]

        title: str = article_data.get("title", "")
        article: str = article_data.get("article", "")
        word_list: List[str] = [word["word"] for word in article_data.get("wordList", [])]

        return {
            "title": title,
            "article": article,
            "word_list": word_list
        }
