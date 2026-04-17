from fastapi import FastAPI, HTTPException
import uvicorn
import logging
from datetime import datetime, timezone
from borneo import QueryRequest
from db import get_nosql_handle, close_nosql_handle

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Hello World API",
    root_path="/api"
)

@app.get("/")
async def hello_world():
    return {
        "message": "Hello World!",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/readiness")
async def readiness():
    return {
        "ready": True,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/hello-world", responses={500: {"description": "Internal server error"}})
async def get_hello_world():
    logger.info("Querying NoSQL table...")
    try:
        handle = get_nosql_handle()
        request = QueryRequest().set_statement("SELECT * FROM hello_world")
        results = []
        while True:
            result = handle.query(request)
            results.extend(result.get_results())
            if request.is_done():
                break
        logger.info("NoSQL query returned %d rows", len(results))
        return {"data": results, "count": len(results)}
    except Exception as e:
        logger.error("Error querying NoSQL table: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
