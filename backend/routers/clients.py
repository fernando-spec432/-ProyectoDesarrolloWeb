from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/clientes", tags=["Módulo 3: Clientes"])

@router.get("", response_model=List[schemas.ClienteResponse])
def listar_clientes(
    search: Optional[str] = Query(None, description="Buscar por nombres, apellidos, NIT o correo"),
    estado: Optional[str] = Query(None, description="Filtrar por estado (ACTIVO / INACTIVO)"),
    db: Session = Depends(get_db)
):
    """Consultar y buscar clientes registrados."""
    return crud.get_clientes(db, search=search, estado=estado)

@router.get("/{cliente_id}", response_model=schemas.ClienteResponse)
def obtener_cliente(cliente_id: int, db: Session = Depends(get_db)):
    """Obtiene información detallada de un cliente por ID."""
    cliente = crud.get_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

@router.post("", response_model=schemas.ClienteResponse, status_code=status.HTTP_201_CREATED)
def registrar_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    """Registra un nuevo cliente en el supermercado."""
    return crud.create_cliente(db, cliente)

@router.put("/{cliente_id}", response_model=schemas.ClienteResponse)
def editar_cliente(cliente_id: int, cliente_update: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    """Edita la información de un cliente existente."""
    cliente = crud.update_cliente(db, cliente_id, cliente_update)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente
