from service.llm_model import request_llm
from fastapi import HTTPException
import logging

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

async def generate_levels(article_text: str):
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
    content = await request_llm(prompt)
    levels = parse_levels(content)
    return levels

async def news_levels_generate(article):
    if not article:
        logging.info("news_levels_generate: 뉴스 데이터가 없습니다.")
        raise HTTPException(status_code=400, detail="뉴스 기사가 없습니다.")

    try:
        levels = await generate_levels(article)
        context_list = make_context_list(levels)
        return context_list

    except Exception as e:
        logging.error(f"news_levels_generate 생성 실패: {e}")

