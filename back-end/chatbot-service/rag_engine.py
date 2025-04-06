import os
import openai
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import uuid

VECTOR_DIR = "vector_store"
os.makedirs(VECTOR_DIR, exist_ok=True)

model = SentenceTransformer("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")  # 가볍고 빠름

def get_embedding(text: str) -> np.ndarray:
    return model.encode([text])[0]

def chunk_text(text: str, chunk_size: int = 300) -> list[str]:
    # 문단 단위 or n글자 단위 자르기
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])
    return chunks

def build_faiss_index(chunks: list[str], index_path: str):
    embeddings = np.array([get_embedding(chunk) for chunk in chunks]).astype("float32")
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)

    # 저장
    faiss.write_index(index, f"{index_path}.index")
    with open(f"{index_path}.pkl", "wb") as f:
        pickle.dump(chunks, f)

def retrieve_similar_chunks(index_path: str, query: str, top_k: int = 3) -> list[str]:
    query_vector = get_embedding(query).astype("float32").reshape(1, -1)
    index = faiss.read_index(f"{index_path}.index")
    with open(f"{index_path}.pkl", "rb") as f:
        chunks = pickle.load(f)

    distances, indices = index.search(query_vector, top_k)
    return [chunks[i] for i in indices[0] if i < len(chunks)]
