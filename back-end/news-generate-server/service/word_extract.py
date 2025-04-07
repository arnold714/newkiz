import os
import aiohttp
from dotenv import load_dotenv
from collections import Counter
from konlpy.tag import Okt
from service.llm_model import request_llm

# 환경 변수 로드
load_dotenv()
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
OLLAMA_URL = "http://localhost:11434/api/chat"

# 불용어 불러오기
with open("resources/korean_stopwords.txt", "r", encoding="utf-8") as f:
    stopwords = set([line.strip() for line in f if line.strip()])

# 형태소 기반 단어 추출
def extract_keywords(text, stopwords, top_n=10):
    okt = Okt()
    nouns = okt.nouns(text)
    filtered = [noun for noun in nouns if noun not in stopwords and len(noun) > 1]
    counter = Counter(filtered)
    return [word for word, _ in counter.most_common(top_n)]

# 네이버 백과사전 정의 검색
async def fetch_definitions_naver(word):
    url = f"https://openapi.naver.com/v1/search/encyc.json?query={word}&display=3"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status == 200:
                data = await response.json()
                return [item["description"] for item in data.get("items", [])]
    return []

async def generate_definition_with_ollama(word, definition=None):
    if definition:
        prompt = f"""
단어: "{word}"
뜻: "{definition}"
이 뜻을 초등학생도 이해할 수 있도록 한두 문장으로 짧고 간단하게 설명해 주세요.
불필요한 인사말이나 예시는 넣지 말고, 설명만 출력해 주세요.
"""
    else:
        prompt = f"""
단어: "{word}"
이 단어의 뜻을 초등학생도 알 수 있도록 한두 문장으로 짧고 쉽게 설명해 주세요.
인사말, 예시, 불필요한 수식 없이 의미만 간단히 알려주세요.
"""

    try:
        return await request_llm(prompt)
    except Exception as e:
        print(f"LLM 요청 중 오류 발생: {e}")
        return None


# 전체 처리 함수
async def word_extraction(text: str):
    keywords = extract_keywords(text, stopwords, top_n=10)
    word_list = []

    for word in keywords:
        definitions = await fetch_definitions_naver(word)
        if definitions:
            simplified = await generate_definition_with_ollama(word, definitions[0])
        else:
            simplified = await generate_definition_with_ollama(word)

        if simplified:
            word_list.append({"word": word, "mean": simplified})

    return word_list