import logging
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from fastapi import HTTPException

gemma = ChatOllama(
    model="gemma3:4b",
    temperature=0,
    base_url="http://localhost:11434"
)

async def request_llm(prompt: str) -> str:
    try:
        result = await gemma.ainvoke([HumanMessage(content=prompt)])
        return result.content.strip()
    except Exception as e:
        logging.error(f"LLM 호출 중 오류 발생: {e}")
        raise HTTPException(status_code=500, detail="LLM 호출 중 오류 발생")
