import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

class Settings:
    # Una sola variable — cambia entre local y Supabase desde el .env
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://postgres:postgres@localhost:5432/supermercado_db"
    )
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supermercado")
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:4200")
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", 8000))

settings = Settings()
