from service.llm_model import request_llm

# 뉴스 요약 생성
async def generate_summary(title, article):
    prompt = f"""다음은 뉴스 기사입니다. 이 내용을 초등학생도 이해할 수 있도록 쉬운 표현을 사용하여 3줄에서 5줄로 쉽게 요약해 주세요.

기사 제목: {title}

기사 내용:
{article}

요약:"""
    response = await request_llm(prompt)
    return response