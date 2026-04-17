from fastapi import FastAPI, HTTPException
import uvicorn
from datetime import datetime, timezone
from borneo import QueryRequest
from db import get_nosql_handle, close_nosql_handle

app = FastAPI(
    title="Hello World API",
    root_path="/api"
)


@app.on_event("shutdown")
def shutdown():
    close_nosql_handle()


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


@app.get("/hello-world")
async def get_hello_world():
    try:
        handle = get_nosql_handle()
        request = QueryRequest().set_statement("SELECT * FROM hello_world")
        results = []
        while True:
            result = handle.query(request)
            results.extend(result.get_results())
            if request.is_done():
                break
        return {"data": results, "count": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
