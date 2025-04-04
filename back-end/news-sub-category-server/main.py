from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import re
import os

app = FastAPI()

# ===== 텍스트 전처리 함수 =====
def clean_text(text):
    text = re.sub(r"[^\w\sㄱ-ㅎ가-힣]", " ", str(text))
    text = re.sub(r"\s+", " ", text)
    return text.strip()

# ===== 카테고리명 매핑 =====
category_name_map = {
    "정치": "politics",
    "경제": "economy",
    "사회": "society",
    "생활/문화": "life",
    "IT/과학": "it_science",
    "세계": "world",
    "스포츠": "sports"
}

# ===== 요청 모델 =====
class NewsRequest(BaseModel):
    title: str
    category: str
    article: str

# ===== API =====
@app.post("/predict")
def predict_sub_category(news: NewsRequest):
    text = clean_text(news.title + " " + news.article)
    cat_key = category_name_map.get(news.category, news.category.replace("/", "_"))
    model_path = f"models/{cat_key}_pipeline.pkl"
    print(f"모델 경로: {model_path}")
    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="모델을 찾을 수 없습니다: " + cat_key)

    model = joblib.load(model_path)
    prediction = model.predict([text])

    return {"sub_category": prediction[0]}

# 예시 요청
# {
#   "title": "정부, 탄소중립 정책 발표",
#   "category": "정치",
#   "article": "오늘 정부는 2050 탄소중립을 위한 계획을 공개했다."
# }
