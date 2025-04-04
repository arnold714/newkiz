import os
from dotenv import load_dotenv
from redis_client import redis_client  # redis.py → redis_client.py로 이름 바꾸는 게 직관적

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

BASE_PATH = "vectorstores"
os.makedirs(BASE_PATH, exist_ok=True)

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key=openai_api_key)

def create_vectorstore(session_id: str, news_text: str):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.create_documents([news_text])
    vs = FAISS.from_documents(docs, embeddings)

    faiss_path = os.path.join(BASE_PATH, session_id)
    vs.save_local(faiss_path)

    r.set(session_id, faiss_path)

def get_qa_chain(session_id: str):
    faiss_path = r.get(session_id)
    if not faiss_path:
        raise ValueError("Vector store not found. 뉴스 먼저 등록하세요.")

    faiss_path = faiss_path.decode("utf-8")
    vs = FAISS.load_local(faiss_path, embeddings)

    prompt_template = """당신은 뉴스 내용을 잘 이해하는 AI입니다.
아래는 뉴스의 일부 내용입니다:
-------------------
{context}
-------------------
지금까지의 대화:
{chat_history}

사용자의 질문:
{query}

AI의 답변:"""

    prompt = PromptTemplate(
        input_variables=["context", "chat_history", "query"],
        template=prompt_template
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vs.as_retriever(),
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt}
    )
    return qa_chain
