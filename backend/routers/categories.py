from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/categorias", tags=["Módulo 2: Categorías"])

@router.get("", response_model=List[schemas.CategoriaResponse])
def listar_categorias(
    search: Optional[str] = Query(None, description="Buscar por nombre o descripción"),
    estado: Optional[str] = Query(None, description="Filtrar por estado (ACTIVO / INACTIVO)"),
    db: Session = Depends(get_db)
):
    """Obtiene el listado completo de categorías disponibles."""
    return crud.get_categorias(db, search=search, estado=estado)

@router.get("/{categoria_id}", response_model=schemas.CategoriaResponse)
def obtener_categoria(categoria_id: int, db: Session = Depends(get_db)):
    """Obtiene una categoría por su ID."""
    cat = crud.get_categoria(db, categoria_id)
    if not cat:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return cat

@router.post("", response_model=schemas.CategoriaResponse, status_code=status.HTTP_201_CREATED)
def crear_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(get_db)):
    """Crea una nueva categoría para clasificar los productos del supermercado."""
    return crud.create_categoria(db, categoria)

@router.put("/{categoria_id}", response_model=schemas.CategoriaResponse)
def actualizar_categoria(categoria_id: int, categoria_update: schemas.CategoriaUpdate, db: Session = Depends(get_db)):
    """Modifica la información de una categoría existente."""
    cat = crud.update_categoria(db, categoria_id, categoria_update)
    if not cat:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return cat

@router.patch("/{categoria_id}/desactivar", response_model=schemas.CategoriaResponse)
def desactivar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    """Desactiva una categoría."""
    cat = crud.toggle_categoria_estado(db, categoria_id, "INACTIVO")
    if not cat:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return cat

@router.patch("/{categoria_id}/activar", response_model=schemas.CategoriaResponse)
def activar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    """Activa una categoría."""
    cat = crud.toggle_categoria_estado(db, categoria_id, "ACTIVO")
    if not cat:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return cat
