from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/inventario", tags=["Módulo 7: Inventario"])

@router.get("", response_model=List[schemas.InventarioItemResponse])
def consultar_inventario_general(db: Session = Depends(get_db)):
    """
    **Consultar Inventario General**:
    Permite conocer las existencias actuales de todos los productos, su categoría, stock mínimo y estado (SUFICIENTE, STOCK BAJO, AGOTADO).
    """
    return crud.get_inventario_general(db)

@router.get("/critico", response_model=List[schemas.StockCriticoResponse])
def consultar_inventario_critico(db: Session = Depends(get_db)):
    """
    **Consultar Stock Crítico / Alertas**:
    Retorna los productos que requieran reabastecimiento urgente por estar bajo o igual a su stock mínimo.
    """
    return crud.get_productos_stock_critico(db)
