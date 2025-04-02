from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import json

# ✅ 모델 및 토크나이저 로딩
MODEL_PATH = "news_category_model"
model = BertForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
model.eval()

# ✅ 라벨 디코더 로딩
with open("./news_category_model/label_map.json", "r", encoding="utf-8") as f:
    label_map = json.load(f)

id2label = {v: k for k, v in label_map.items()}

# ✅ FastAPI 앱 정의
app = FastAPI()

class NewsInput(BaseModel):
    category: str
    title: str
    article: str

@app.post("/predict")
def predict(news: NewsInput):
    input_text = f"{news.category} [SEP] {news.title} [SEP] {news.article}"
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        pred = torch.argmax(outputs.logits, dim=1).item()
    print(f"Predicted sub-category: {pred}")
    print(f"Predicted sub-category: {id2label[pred]}")
    return {"sub_category": id2label[pred]}
