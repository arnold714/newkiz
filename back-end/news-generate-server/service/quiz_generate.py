from service.llm_model import request_llm
from fastapi import HTTPException
import logging
import json


async def generate_quiz(article_text: str, keyword_list: list[str]) -> dict:
    keyword_text = ', '.join(keyword_list[:5])
    prompt = f"""
다음 뉴스 기사를 바탕으로 퀴즈 2개를 만들어 주세요:

1. OX 퀴즈:
- 뉴스 내용과 관련된 사실 여부를 O, X로 대답할 수 있게 묻는 질문 1개
- 형식: "질문", "정답(O 또는 X)"

2. 객관식 퀴즈:
- 중요한 단어들({keyword_text}) 중 하나를 사용하여 의미를 묻는 객관식 퀴즈 1개
- 보기 4개 중 정답 1개
- 형식: "질문", "보기 리스트", "정답"

아래 JSON 형식으로만 출력하고 JSON 이외의 내용은 포함하지 마세요:
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
    raw = await request_llm(prompt)

    if raw.startswith("```json"):
        raw = raw.removeprefix("```json").strip()
    if raw.endswith("```"):
        raw = raw.removesuffix("```").strip()

    try:
        quiz_data = json.loads(raw)
    except Exception as e:
        logging.error("퀴즈 JSON 파싱 실패: %s", e)
        raise HTTPException(
            status_code=500,
            detail="퀴즈 생성 중 JSON 파싱에 실패했습니다. 다시 시도해 주세요."
        )

    return quiz_data