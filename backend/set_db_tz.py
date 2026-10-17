from database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text('ALTER DATABASE "Superpt" SET timezone TO \'America/Guatemala\';'))
    conn.commit()
    res = conn.execute(text("SHOW timezone;")).scalar()
    print("Zona horaria de PostgreSQL establecida a:", res)
