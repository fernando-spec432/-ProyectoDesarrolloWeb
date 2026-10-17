from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/proveedores", tags=["Módulo 4: Proveedores"])

@router.get("", response_model=List[schemas.ProveedorResponse])
def listar_proveedores(
    search: Optional[str] = Query(None, description="Buscar por nombre de proveedor, NIT o contacto"),
    estado: Optional[str] = Query(None, description="Filtrar por estado (ACTIVO / INACTIVO)"),
    db: Session = Depends(get_db)
):
    """Consultar y buscar proveedores del supermercado."""
    return crud.get_proveedores(db, search=search, estado=estado)

@router.get("/{proveedor_id}", response_model=schemas.ProveedorResponse)
def obtener_proveedor(proveedor_id: int, db: Session = Depends(get_db)):
    """Obtiene información detallada de un proveedor por ID."""
    prov = crud.get_proveedor(db, proveedor_id)
    if not prov:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return prov

@router.post("", response_model=schemas.ProveedorResponse, status_code=status.HTTP_201_CREATED)
def registrar_proveedor(proveedor: schemas.ProveedorCreate, db: Session = Depends(get_db)):
    """Registra un nuevo proveedor de mercancía."""
    return crud.create_proveedor(db, proveedor)

@router.put("/{proveedor_id}", response_model=schemas.ProveedorResponse)
def editar_proveedor(proveedor_id: int, proveedor_update: schemas.ProveedorUpdate, db: Session = Depends(get_db)):
    """Edita la información de un proveedor existente."""
    prov = crud.update_proveedor(db, proveedor_id, proveedor_update)
    if not prov:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return prov
