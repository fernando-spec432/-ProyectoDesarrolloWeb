from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/ventas", tags=["Módulo 6: Ventas"])

@router.get("", response_model=List[schemas.VentaResponse])
def listar_ventas(db: Session = Depends(get_db)):
    """Obtiene el historial de ventas realizadas en el supermercado."""
    return crud.get_ventas(db)

@router.get("/{venta_id}", response_model=schemas.VentaResponse)
def obtener_venta(venta_id: int, db: Session = Depends(get_db)):
    """Obtiene el encabezado y comprobante/detalle de una venta por ID."""
    venta = crud.get_venta_by_id(db, venta_id)
    if not venta:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    return venta

@router.post("", response_model=schemas.VentaResponse, status_code=status.HTTP_201_CREATED)
def registrar_venta(venta: schemas.VentaCreate, db: Session = Depends(get_db)):
    """
    **Registrar Venta**:
    Registra una venta con múltiples productos y descuenta automáticamente el inventario (Inventario -= Cantidad).
    
    ⚠️ **Regla de negocio obligatoria**: No se permite realizar ventas si no hay suficiente inventario disponible.
    """
    try:
        return crud.create_venta(db, venta)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error procesando la venta: {str(e)}")
