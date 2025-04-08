from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging
from pydantic import BaseModel

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger("dicapri-ai-backend")

# Setup da aplicação FastAPI
app = FastAPI(title="DiCapri AI Backend")

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar apenas origens confiáveis
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de dados
class PromptRequest(BaseModel):
    prompt: str

# Rotas básicas
@app.get("/")
async def root():
    return {"status": "online", "message": "DiCapri AI Backend is running"}

# Importa routers das crews
from routers.content_planner import router as content_planner_router
from routers.dicapri_taco import router as dicapri_taco_router
from routers.social_media import router as social_media_router
from routers.image_creator import router as image_creator_router
from routers.rag_creator import router as rag_creator_router

# Adiciona routers à aplicação
app.include_router(content_planner_router, prefix="/crews/content-planner", tags=["Content Planner"])
app.include_router(dicapri_taco_router, prefix="/crews/dicapri-taco", tags=["DiCapri Taco"])
app.include_router(social_media_router, prefix="/crews/social-media", tags=["Social Media"])
app.include_router(image_creator_router, prefix="/crews/image-creator", tags=["Image Creator"])
app.include_router(rag_creator_router, prefix="/crews/rag-creator", tags=["RAG Creator"])

# Middleware para logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url.path}")
    try:
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        raise

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
