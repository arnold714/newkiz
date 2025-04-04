import os
import redis
from dotenv import load_dotenv

load_dotenv()

redis_host = os.getenv("REDIS_HOST", "localhost")
redis_port = int(os.getenv("REDIS_PORT", 6379))
redis_db = int(os.getenv("REDIS_DB", 0))

# Redis 클라이언트 인스턴스 반환
redis_client = redis.Redis(host=redis_host, port=redis_port, db=redis_db)
