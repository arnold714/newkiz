from model.news_model import News
from fastapi import HTTPException
import joblib
import os
import re
import logging

def clean_text(text):
    text = re.sub(r"[^\w\sㄱ-ㅎ가-힣]", " ", str(text))
    text = re.sub(r"\s+", " ", text)
    return text.strip()

# 카테고리명 매핑
category_name_map = {
    "정치": "politics",
    "경제": "economy",
    "사회": "society",
    "생활/문화": "life",
    "IT/과학": "it_science",
    "세계": "world",
    "스포츠": "sports"
}

def sub_category_classify(news: News):
    text = clean_text(news.title + " " + news.article)
    cat_key = category_name_map.get(news.category, news.category.replace("/", "_"))
    model_path = f"ml/{cat_key}_pipeline.pkl"
    if not os.path.exists(model_path):
        logging.error("모델 파일이 존재하지 않습니다: %s", model_path)
        raise HTTPException(status_code=404, detail="모델을 찾을 수 없습니다: " + cat_key)

    model = joblib.load(model_path)
    prediction = model.predict([text])

    return prediction[0]

