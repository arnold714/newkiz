# app/Dockerfile
FROM python:3.10-slim

# 필요한 빌드 도구 설치
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# requirements.txt 복사
COPY requirements.txt .

# pip 업그레이드 후 requirements.txt 설치
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# FastAPI 서버 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
