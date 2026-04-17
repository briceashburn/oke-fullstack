from fastapi import FastAPI
import uvicorn
from datetime import datetime, timezone

app = FastAPI(
    title="Hello World API",
    root_path="/api"
)

@app.get('/')
async def hello_world():
    return {
        'message': 'Hello World!',
        'timestamp': datetime.now(timezone.utc).isoformat()
    }

@app.get('/health')
async def health():
    return {
        'status': 'healthy',
        'timestamp': datetime.now(timezone.utc).isoformat()
    }

@app.get('/readiness')
async def readiness():
    return {
        'ready': True,
        'timestamp': datetime.now(timezone.utc).isoformat()
    }

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080, log_level='info')
