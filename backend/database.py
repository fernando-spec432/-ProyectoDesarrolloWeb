from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
from config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    
)

# Configurar automáticamente la zona horaria local (America/Guatemala -06:00) en cada conexión
@event.listens_for(engine, "connect")
def set_timezone(dbapi_connection, connection_record):
    try:
        cursor = dbapi_connection.cursor()
        cursor.execute("SET timezone = 'America/Guatemala';")
        cursor.close()
    except Exception:
        pass

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
