from fastapi import FastAPI
from models import NewsInput, QuestionInput
from rag import create_vectorstore, get_qa_chain
from memory import add_to_history, get_history

app = FastAPI()

@app.post("/init_news")
def init_news(news: NewsInput):
    text = f"제목: {news.title}\n본문: {news.body}\n키워드: {', '.join(news.keywords)}"
    create_vectorstore(news.user_id + news.news_id, text)
    return {"message": f"뉴스 세션 생성 완료: {news.session_id}"}

@app.post("/chat")
def chat(input: QuestionInput):
    history = get_history(input.session_id)
    formatted_history = "\n".join([f"사용자: {q}\nAI: {a}" for q, a in history])

    chain = get_qa_chain(input.session_id)
    response = chain.invoke({"query": input.question, "chat_history": formatted_history})

    add_to_history(input.session_id, input.question, response)
    return {"answer": response}