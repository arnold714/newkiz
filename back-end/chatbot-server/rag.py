import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores.faiss import FAISS as FAISSStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
vectorstores = {}  # session_id: FAISSStore

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key=openai_api_key)

def create_vectorstore(session_id: str, news_text: str):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.create_documents([news_text])
    vs = FAISS.from_documents(docs, embeddings)
    vectorstores[session_id] = vs

def get_qa_chain(session_id: str):
    vs = vectorstores.get(session_id)
    if not vs:
        raise ValueError("Vector store not found. 뉴스 먼저 등록하세요.")

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
