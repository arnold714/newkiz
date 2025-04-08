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

async def generate_definition_with_ollama(word, text, definition=None):
    if definition:
        prompt = f"""
당신은 초등학생을 위한 사전입니다.
내용의 문맥에 맞는 단어의 뜻을 초등학생도 이해할 수 있도록 한두 문장으로 짧고 간단하게 설명해 주세요.
불필요한 인사말이나 예시, "## 출력 예시"는 넣지 말고, 설명만 출력해 주세요.
단어: "{word}"
뜻: "{definition}"
내용: "{text}"

## 입력 예시
단어: "주식"    
뜻: "<b>주식</b>회사의 자본을 이루는 단위로서의 금액 및 이를 전제로 한 주주의 권리·의무(주주권).  <b>주식</b>회사는 자본단체이므로 자본이 없이는 성립할 수 없다. 자본은 사원인 주주(株主)의 출자이며, 권리와 의무의..."
내용: "소셜미디어 X에 올라온 관세 관련 가짜뉴스로 S&P500지수의 1시간 변동폭이 8%포인트까지 벌어지는 등 뉴욕증시가 천당과 지옥을 오갔다. 트럼프의 입에 좌지우지되는 미국 주식시장의 혼란이 극심하다는 분석이 나온다.
이날 S&P500은 개장 직후 전일 종가보다 4.6% 낮게 거래됐다.
개장 약 40분 뒤 X에서 약 1000여명의 팔로워를 보유한 사용자명 ‘Hammer Capital’ 이 “해셋: 트럼프는 중국을 제외한 모든 국가에 90일간 관세 유예를 고려하고 있다”고 전했다.
이 게시물의 ‘해셋’은 이날 오전 폭스 뉴스가 인터뷰 캐빈 해셋 백악관 경제 고문을 지칭한다. 그는 이날 인터뷰에서 관세 유예 가능성을 묻는 질문에 함구했지만, 소셜미디어에선 와전된 인터뷰 내용이 퍼졌다.
게시물이 올라온 지 5분 뒤 CNBC가 이를 보도했다.
10분 뒤엔 S&P500이 플러스 3.4%까지 치솟아 시가총액 3조달러 이상을 회복했다.
그러나 30분 뒤 백악관은 이 소식이 가짜 뉴스라며 일축했고, 지수는 다시 마이너스 2.3%까지 떨어졌다. 이후 S&P500지수는 변동 폭을 줄이며 마이너스 1.3%로 마감했다.
가짜 뉴스 하나에 시장이 롤러코스터 장세를 보이자 시장의 관세 민감도가 극심하다는 분석이 나왔다.
한지영 키움증권 연구원은 “가짜 뉴스 하나에도 미국 증시가 크게 요동을 치는 것은 그만큼 시장이 트럼프 관세 리스크에 민감해졌으며, 관세정책 완화에 대한 절박함을 느낄 수 있는 부분”이라고 평가했다.
관세 이슈로 시장이 크게 하락한 상황에서 저점 매수를 노리고 있는 투자자가 많다는 해석도 제기됐다.
삭소방크의 세일즈 담당 안드레아 투에니는 “이날 미국증시의 변동성은 시장의 극심한 불안 상태를 보여준다”며 “바닥을 놓치고 싶어하지 않는 투자자들이 많다”고 밝혔다.
최근 주식시장이 도널드 트럼프 미국 대통령의 말 한마디에 좌지우지된다는 의견도 제시됐다.
로스 거버 가와사키웰스앤드인베스트먼트 최고경영자(CEO)는 “만약 트럼프가 내일 일어나서 ‘그거 알아요? 나 (관세 부과) 안 할 겁니다’라고 말하면 시장은 전고점을 회복할 것”이라고 말했다."

## 출력 예시
"주식은 회사를 아주 작게 나눈 조각이에요. 그 조각을 사면, 그 회사의 아주 작은 주인이 되는 거예요."

"""
    else:
        prompt = f"""
당신은 초등학생을 위한 사전입니다.
내용의 문맥에 맞는 단어의 뜻을 초등학생도 이해할 수 있도록 한두 문장으로 짧고 간단하게 설명해 주세요.
불필요한 인사말이나 예시, "## 출력 예시"는 넣지 말고, 설명만 출력해 주세요.
단어: "{word}"
내용: "{text}"

## 입력 예시
단어: "주식"
내용: "소셜미디어 X에 올라온 관세 관련 가짜뉴스로 S&P500지수의 1시간 변동폭이 8%포인트까지 벌어지는 등 뉴욕증시가 천당과 지옥을 오갔다. 트럼프의 입에 좌지우지되는 미국 주식시장의 혼란이 극심하다는 분석이 나온다.
이날 S&P500은 개장 직후 전일 종가보다 4.6% 낮게 거래됐다.
개장 약 40분 뒤 X에서 약 1000여명의 팔로워를 보유한 사용자명 ‘Hammer Capital’ 이 “해셋: 트럼프는 중국을 제외한 모든 국가에 90일간 관세 유예를 고려하고 있다”고 전했다.
이 게시물의 ‘해셋’은 이날 오전 폭스 뉴스가 인터뷰 캐빈 해셋 백악관 경제 고문을 지칭한다. 그는 이날 인터뷰에서 관세 유예 가능성을 묻는 질문에 함구했지만, 소셜미디어에선 와전된 인터뷰 내용이 퍼졌다.
게시물이 올라온 지 5분 뒤 CNBC가 이를 보도했다.
10분 뒤엔 S&P500이 플러스 3.4%까지 치솟아 시가총액 3조달러 이상을 회복했다.
그러나 30분 뒤 백악관은 이 소식이 가짜 뉴스라며 일축했고, 지수는 다시 마이너스 2.3%까지 떨어졌다. 이후 S&P500지수는 변동 폭을 줄이며 마이너스 1.3%로 마감했다.
가짜 뉴스 하나에 시장이 롤러코스터 장세를 보이자 시장의 관세 민감도가 극심하다는 분석이 나왔다.
한지영 키움증권 연구원은 “가짜 뉴스 하나에도 미국 증시가 크게 요동을 치는 것은 그만큼 시장이 트럼프 관세 리스크에 민감해졌으며, 관세정책 완화에 대한 절박함을 느낄 수 있는 부분”이라고 평가했다.
관세 이슈로 시장이 크게 하락한 상황에서 저점 매수를 노리고 있는 투자자가 많다는 해석도 제기됐다.
삭소방크의 세일즈 담당 안드레아 투에니는 “이날 미국증시의 변동성은 시장의 극심한 불안 상태를 보여준다”며 “바닥을 놓치고 싶어하지 않는 투자자들이 많다”고 밝혔다.
최근 주식시장이 도널드 트럼프 미국 대통령의 말 한마디에 좌지우지된다는 의견도 제시됐다.
로스 거버 가와사키웰스앤드인베스트먼트 최고경영자(CEO)는 “만약 트럼프가 내일 일어나서 ‘그거 알아요? 나 (관세 부과) 안 할 겁니다’라고 말하면 시장은 전고점을 회복할 것”이라고 말했다."

## 출력 예시
"주식은 회사를 아주 작게 나눈 조각이에요. 그 조각을 사면, 그 회사의 아주 작은 주인이 되는 거예요."
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
            simplified = await generate_definition_with_ollama(word, text, definitions[0])
        else:
            simplified = await generate_definition_with_ollama(word, text)

        if simplified:
            word_list.append({"word": word, "mean": simplified})

    return word_list