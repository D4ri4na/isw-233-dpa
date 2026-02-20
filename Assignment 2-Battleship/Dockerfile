FROM python:3.9-slim
# Esto permite ver los print() inmediatamente en la consola 
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY app.py .
ENTRYPOINT ["python", "app.py"]