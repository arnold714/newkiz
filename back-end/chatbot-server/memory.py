import os
import json
from redis_client import redis_client  # redis 연결 모듈
from dotenv import load_dotenv

load_dotenv()
TTL_SECONDS = os.getenv("TTL_SECONDS", "localhost")
# 채팅 기록 추가
def add_to_history(session_id, question, answer):
    key = f"chat:{session_id}"
    new_entry = json.dumps({"q": question, "a": answer})
    
    redis_client.rpush(key, new_entry)  # Redis List에 추가
    redis_client.expire(key, ttl_seconds)   # TTL 설정

# 채팅 기록 가져오기
def get_history(session_id):
    key = f"chat:{session_id}"
    history_json_list = redis_client.lrange(key, 0, -1)  # Redis List에서 전체 가져오기
    history = []
    for item in history_json_list:
        item_dict = json.loads(item.decode("utf-8"))
        history.append((item_dict["q"], item_dict["a"]))
    return history


