from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/compras", tags=["Módulo 5: Compras"])

@router.get("", response_model=List[schemas.CompraResponse])
def listar_compras(db: Session = Depends(get_db)):
    """Obtiene el historial general de compras a proveedores."""
    return crud.get_compras(db)

@router.get("/{compra_id}", response_model=schemas.CompraResponse)
def obtener_compra(compra_id: int, db: Session = Depends(get_db)):
    """Obtiene el encabezado y detalle de una compra específica por ID."""
    compra = crud.get_compra_by_id(db, compra_id)
    if not compra:
        raise HTTPException(status_code=404, detail="Compra no encontrada")
    return compra

@router.post("", response_model=schemas.CompraResponse, status_code=status.HTTP_201_CREATED)
def registrar_compra(compra: schemas.CompraCreate, db: Session = Depends(get_db)):
    """
    **Registrar Compra**:
    Registra una nueva compra a proveedores con su detalle y actualiza automáticamente el inventario (Inventario += Cantidad).
    """
    try:
        return crud.create_compra(db, compra)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error al procesar la compra: {str(e)}")
