import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# Configurações gerais
API_KEYS = {
    "openai": os.getenv("OPENAI_API_KEY", ""),
    "stability": os.getenv("STABILITY_API_KEY", ""),
    # Adicione outras chaves API conforme necessário
}

# Configurações específicas para as crews
CONFIG = {
    "content_planner": {
        "model": "gpt-4",
        # Outras configurações específicas
    },
    "dicapri_taco": {
        "model": "gpt-4",
        # Outras configurações específicas
    },
    "social_media": {
        "model": "gpt-4",
        # Outras configurações específicas
    },
    "image_creator": {
        "model": "dall-e-3",
        # Outras configurações específicas
    },
    "rag_creator": {
        "model": "gpt-4",
        "embedding_model": "text-embedding-ada-002",
        # Outras configurações específicas
    }
}
