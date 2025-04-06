import redis
import os
from dotenv import load_dotenv

load_dotenv()

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    db=int(os.getenv("REDIS_DB", 0)),
    decode_responses=True,
    password=os.getenv("REDIS_PASSWORD", None)
)

pubsub = redis_client.pubsub()
pubsub.psubscribe("__keyevent@0__:expired")

print("🧹 Vector cleaner is watching Redis key expirations...")

for message in pubsub.listen():
    if message["type"] == "pmessage":
        expired_key = message["data"]
        try:
            user_id, news_id = expired_key.split(":")
            vector_base = f"/vector_store/{user_id}_{news_id}"
            os.remove(f"{vector_base}.index")
            os.remove(f"{vector_base}.pkl")
            print(f"🗑️  Removed vector store for: {expired_key}")
        except Exception as e:
            print(f"⚠️  Failed to remove vector store for {expired_key}: {e}")
