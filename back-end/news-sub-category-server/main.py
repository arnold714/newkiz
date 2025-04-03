# fastapi_app.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib

app = FastAPI()

# 학습된 카테고리별 모델 불러오기
models = joblib.load("category_models.joblib")

class NewsInput(BaseModel):
    title: str
    article: str
    category: str

@app.post("/predict")
def predict(news: NewsInput):
    # 입력받은 category가 모델에 존재하는지 확인
    if news.category not in models:
        raise HTTPException(status_code=400, detail="지원하지 않는 category입니다.")
    
    # title과 article을 합쳐 텍스트 생성
    text = news.title + " " + news.article
    
    # 해당 category 모델로 예측
    pred = models[news.category].predict([text])[0]
    
    return {"sub_category": pred}

# uvicorn을 이용해 실행할 수 있음:
# uvicorn fastapi_app:app --reload
