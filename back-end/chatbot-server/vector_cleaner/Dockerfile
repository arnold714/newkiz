# cleaner/Dockerfile.cleaner

FROM python:3.12-slim

WORKDIR /cleaner

COPY ../requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "vector_cleaner.py"]
