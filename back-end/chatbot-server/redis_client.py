import redis
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    db=int(os.getenv("REDIS_DB", 0)),
    decode_responses=True
)

REDIS_TTL_SECONDS = int(os.getenv("REDIS_TTL_SECONDS", 3600))  # 기본 1시간