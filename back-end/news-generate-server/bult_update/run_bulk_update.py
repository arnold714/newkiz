import asyncio
from bson import ObjectId
from datetime import datetime
import re
import json
from collections import Counter

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from konlpy.tag import Okt

from database import db  # MongoDB 연결 설정

collection = db["articles_test"]

gemma = ChatOllama(
    model="gemma3:4b",
    temperature=0,
    base_url="http://localhost:11434"
)

def clean_text(text):
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'\([^)]*\)', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

def load_stopwords(filepath='stopwords.txt'):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return set(line.strip() for line in f if line.strip())
    except FileNotFoundError:
        return set()

def extract_keywords(text, stopwords, top_n=10):
    okt = Okt()
    nouns = okt.nouns(text)
    filtered = [noun for noun in nouns if noun not in stopwords and len(noun) > 1]
    counter = Counter(filtered)
    return [word for word, _ in counter.most_common(top_n)]

def parse_levels(text):
    levels = {'하': '', '중': '', '상': ''}
    current = None
    for line in text.splitlines():
        line = line.strip()
        if "[난이도 하]" in line:
            current = '하'
        elif "[난이도 중]" in line:
            current = '중'
        elif "[난이도 상]" in line:
            current = '상'
        elif current:
            levels[current] += line + '\n'
    return levels

def make_context_list(levels: dict[str, str]) -> list[dict]:
    return [
        {"level": 1, "context": [{"type": "text", "data": levels["하"].strip()}]},
        {"level": 2, "context": [{"type": "text", "data": levels["중"].strip()}]},
        {"level": 3, "context": [{"type": "text", "data": levels["상"].strip()}]},
    ]

def get_original_text(item) -> str:
    return item.get("article", "")

async def generate_levels_and_keywords(article_text: str):
    prompt = f"""
        다음 뉴스 기사를 초등학생이 이해할 수 있도록 난이도별로 3단계로 다시 써주세요.
        마크다운 문법과 이모티콘은 사용하지 말고 텍스트로만 구성해 주세요.

        난이도 기준:
        1. 난이도 하 (초등 1~3학년):
        - 매우 쉬운 단어 사용
        - 어려운 단어는 가장 쉬운 말로 대체
        - 외래어, 전문용어는 쉬운단어로 대체하고 괄호에 기존 단어 추가
        - 추상적인 개념이나 한자어를 피해서 구성
        - 문장을 매우 짧고 간단하게 구성
        - 꼭 필요한 경우 괄호 안에 쉬운 설명 추가
        - 원문 내용 그대로 유지

        2. 난이도 중 (초등 4~6학년):
        - 적절한 길이의 문장 사용
        - 어려운 단어는 쉬운 말로 대체하고 괄호에 기존 단어 추가
        - 외래어/전문용어는 쉬운 단어로 대체하고 괄호에 기존 단어 추가
        - 약간의 추상어, 쉬운 한자어 사용 가능
        - 꼭 필요한 경우 괄호 안에 쉬운 설명 추가
        - 원문 내용 그대로 유지

        3. 난이도 상 (초등 6학년 이상):
        - 보다 성숙한 문장 구조 사용
        - 중요한 전문용어 그대로 사용 가능
        - 용어의 의미를 괄호로 보충 설명
        - 맥락과 배경 정보 추가
        - 원문 내용 그대로 유지

        주의사항:
        - 원문의 핵심 사실과 정보는 반드시 유지
        - 각 난이도별로 간단한 제목 추가
        - 아동에게 부적절하거나 충격적인 내용은 주의

        각 버전은 [난이도 하], [난이도 중], [난이도 상]으로 구분하여 작성해주세요.

        뉴스기사:
        {article_text}
    """
    response = await gemma.ainvoke([HumanMessage(content=prompt)])
    content = response.content

    levels = parse_levels(content)
    stopwords = load_stopwords()
    cleaned_text = clean_text(article_text)
    keywords = extract_keywords(cleaned_text, stopwords)

    return levels, keywords

async def generate_quiz_from_llm(article_text: str, keyword_list: list[str]) -> dict:
    keyword_text = ', '.join(keyword_list[:5])
    prompt = f"""
    다음 뉴스 기사를 바탕으로 퀴즈 2개를 만들어 주세요:

    1. OX 퀴즈:
    - 뉴스 내용과 관련된 사실 여부를 묻는 질문 1개
    - 형식: "질문", "정답(O 또는 X)"

    2. 객관식 퀴즈:
    - 중요한 단어들({keyword_text}) 중 하나를 사용하여 의미를 묻는 객관식 퀴즈 1개
    - 보기 4개 중 정답 1개
    - 형식: "질문", "보기 리스트", "정답"

    아래 JSON 형식으로만 출력해 주세요:
    {{
      "ox_quiz": {{
        "question": "...",
        "answer": "O"
      }},
      "multiple_choice_quiz": {{
        "question": "...",
        "options": ["...", "...", "...", "..."],
        "answer": "..."
      }}
    }}

    뉴스 기사:
    {article_text}
    """
    response = await gemma.ainvoke([HumanMessage(content=prompt)])
    raw = response.content.strip()

    if raw.startswith("```json"):
        raw = raw.removeprefix("```json").strip()
    if raw.endswith("```"):
        raw = raw.removesuffix("```").strip()

    try:
        quiz_data = json.loads(raw)
    except Exception as e:
        print("⚠️ 퀴즈 JSON 파싱 실패:", e)
        quiz_data = {
            "ox_quiz": {"question": "", "answer": ""},
            "multiple_choice_quiz": {"question": "", "options": [], "answer": ""}
        }
    return quiz_data

async def update_item_context_and_words(item_id: ObjectId, context_list, keywords, quiz_data):
    word_list = [{"word": kw} for kw in keywords]
    result = await collection.update_one(
        {"_id": item_id},
        {"$set": {
            "context_list": context_list,
            "word_list": word_list,
            "quiz": quiz_data,
            "updated_at": datetime.utcnow()
        }}
    )
    return result

async def run_bulk_update():
    items_cursor = collection.find({}).sort("published", -1)
    updated = 0
    skipped = 0

    print("✅ start")

    async for item in items_cursor:
        item_id = item["_id"]
        article_text = get_original_text(item)
        if not article_text:
            skipped += 1
            continue

        try:
            levels, keywords = await generate_levels_and_keywords(article_text)
            context_list = make_context_list(levels)
            quiz_data = await generate_quiz_from_llm(article_text, keywords)

            result = await update_item_context_and_words(item_id, context_list, keywords, quiz_data)
            if result.modified_count > 0:
                updated += 1
            else:
                skipped += 1

        except Exception as e:
            print(f"[ERROR] ID {item_id}: {e}")
            skipped += 1

    print("✅ Bulk update complete!")
    print(f"▶ Updated: {updated}")
    print(f"▶ Skipped: {skipped}")

if __name__ == "__main__":
    asyncio.run(run_bulk_update())
