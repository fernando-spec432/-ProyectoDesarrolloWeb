from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from database import engine, Base
from routers import products, categories, clients, suppliers, purchases, sales, inventory, auth

# Crear tablas si no existen al iniciar la app (respaldado por schema.sql)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"⚠️ AVISO: No se pudo conectar automáticamente a la base de datos. {e}")
    print("Asegúrate de configurar DATABASE_URL correctamente en backend/.env")

app = FastAPI(
    title="API de Supermercado Control Pro - 7 Módulos",
    description="Backend RESTful completo en Python (FastAPI + SQLAlchemy + Supabase) para Productos, Categorías, Clientes, Proveedores, Compras, Ventas e Inventario.",
    version="2.0.0"
)

# Configurar CORS para permitir comunicación con el Frontend (Angular / HTML5)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir Routers de la API (Módulos 1 al 7 + Auth)
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(clients.router)
app.include_router(suppliers.router)
app.include_router(purchases.router)
app.include_router(sales.router)
app.include_router(inventory.router)

@app.get("/", tags=["Salud / Healthcheck"])
def root():
    return {
        "status": "online",
        "sistema": "Sistema de Gestión de Supermercado Control Pro",
        "modulos": [
            "Módulo 1. Productos",
            "Módulo 2. Categorías",
            "Módulo 3. Clientes",
            "Módulo 4. Proveedores",
            "Módulo 5. Compras",
            "Módulo 6. Ventas",
            "Módulo 7. Inventario"
        ],
        "docs": "/docs",
        "redoc": "/redoc"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=os.getenv("API_HOST", "0.0.0.0"), port=int(os.getenv("API_PORT", 8000)), reload=True)
