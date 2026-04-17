FROM python:3.12-slim

WORKDIR /app

RUN addgroup --system --gid 1001 appgroup && adduser --system --uid 1001 --ingroup appgroup appuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R appuser:appgroup /app \
    && mkdir -p /usr/local/bin/logs \
    && chown appuser:appgroup /usr/local/bin/logs

USER 1001

EXPOSE 8080

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080", "--use-colors"]
