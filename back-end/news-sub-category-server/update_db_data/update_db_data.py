from pymongo import MongoClient
from dotenv import load_dotenv
from tqdm import tqdm

import pandas as pd
import joblib
import os
import re


# ===== 환경 변수 로드 =====
load_dotenv()
MONGO_URL = os.getenv("MONGO_HOST")
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_PORT = os.getenv("MONGO_PORT")
MONGO_DB = os.getenv("MONGO_DB")

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

# ===== MongoDB 연결 =====
mongo_uri = f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_URL}:{MONGO_PORT}"
client = MongoClient(mongo_uri)
db = client[MONGO_DB]
collection = db.articles_test  # 뉴스 기사 컬렉션

# ===== 뉴스 불러오기 =====
news_list = list(collection.find({}))

# ===== 기사별 분류 수행 =====
for news in tqdm(news_list):
    title = news.get("title", "")
    article = news.get("article", "")
    category = news.get("category", "")
    
    

    if not title or not article or not category:
        continue
    
    full_text = clean_text(title + " " + article)
    cat_key = category_name_map.get(category, category.replace("/", "_"))
    model_path = f"../models/{cat_key}_pipeline.pkl"
    print(f"모델 경로: {model_path}")
    if not os.path.exists(model_path):
        continue  # 해당 카테고리 모델이 없으면 건너뜀
    print(f"뉴스 제목: {title}")
    model = joblib.load(model_path)
    sub_category = model.predict([full_text])[0]
    # 결과를 MongoDB에 업데이트
    collection.update_one(
        {"_id": news["_id"]},
        {"$set": {"sub_category": sub_category}}
    )

print("✅ 모든 뉴스 기사에 sub_category 분류 완료")
