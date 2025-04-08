from datetime import datetime

from model.news_model import News
from service.news_summary_generate import generate_summary
from service.sub_category_classify import sub_category_classify
from service.news_levels_generate import news_levels_generate
from service.quiz_generate import generate_quiz
from service.word_extract import word_extraction
from datetime import datetime, UTC
import logging

async def generate_news_pipeline(news: News) -> dict:
    # 1. 요약 생성
    summary = await generate_summary(news.title, news.article)
    
    # 2. 세부 카테고리 분류
    sub_category = sub_category_classify(news)

    # 3. 난이도별 콘텐츠 생성
    context_list = await news_levels_generate(news.article)

    # 4. 키워드 추출 및 쉬운 뜻 생성
    word_list = await word_extraction(news.article)
    keywords = [w["word"] for w in word_list]

    # 5. 퀴즈 생성
    quiz = await generate_quiz(news.article, keywords)

    result = {
        "context_list": context_list,
        "quiz": quiz,
        "updated_at": datetime.now(UTC).isoformat(),
        "word_list": word_list,
        "sub_category": sub_category,
        "summary": summary
    }
    logging.info("뉴스 생성 파이프라인 결과: %s", result)
    # 6. 전체 JSON 객체 구성
    return result