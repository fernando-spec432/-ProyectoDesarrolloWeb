from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/api/productos", tags=["Módulo 1: Productos"])

@router.get("", response_model=List[schemas.ProductoResponse])
def consultar_productos(
    skip: int = 0,
    limit: int = 200,
    search: Optional[str] = Query(None, description="Buscar por código, nombre o descripción"),
    categoria_id: Optional[int] = Query(None, description="Filtrar por ID de categoría"),
    estado: Optional[str] = Query(None, description="Filtrar por estado (ACTIVO / INACTIVO)"),
    db: Session = Depends(get_db)
):
    """
    **Módulo 1: Consultar y Buscar Productos**
    Permite obtener el listado general de productos, aplicar búsquedas dinámicas por texto y filtrar por categoría o estado.
    """
    return crud.get_productos(db, skip=skip, limit=limit, search=search, categoria_id=categoria_id, estado=estado)

@router.get("/stock-critico", response_model=List[schemas.StockCriticoResponse])
def obtener_stock_critico(db: Session = Depends(get_db)):
    """
    **Alerta de Stock Crítico**:
    Retorna todos los productos cuya existencia actual sea menor o igual a su stock mínimo.
    """
    return crud.get_productos_stock_critico(db)

@router.get("/{producto_id}", response_model=schemas.ProductoResponse)
def consultar_producto_por_id(producto_id: int, db: Session = Depends(get_db)):
    """Obtiene el detalle completo de un producto por su ID."""
    prod = crud.get_producto_by_id(db, producto_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return prod

@router.get("/codigo/{codigo}", response_model=schemas.ProductoResponse)
def consultar_producto_por_codigo(codigo: str, db: Session = Depends(get_db)):
    """Obtiene el detalle completo de un producto por su código / SKU."""
    prod = crud.get_producto_by_codigo(db, codigo)
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado con el código especificado")
    return prod

@router.post("", response_model=schemas.ProductoResponse, status_code=status.HTTP_201_CREATED)
def registrar_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    """
    **Registrar Producto**:
    Crea un nuevo producto en el supermercado validando que el código sea único.
    """
    existente = crud.get_producto_by_codigo(db, producto.codigo)
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ya existe un producto registrado con el código '{producto.codigo}'"
        )
    return crud.create_producto(db, producto)

@router.put("/{producto_id}", response_model=schemas.ProductoResponse)
def modificar_producto(producto_id: int, producto_update: schemas.ProductoUpdate, db: Session = Depends(get_db)):
    """
    **Modificar Producto**:
    Actualiza la información de un producto existente por su ID.
    """
    prod = crud.update_producto(db, producto_id, producto_update)
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return prod

@router.patch("/{producto_id}/desactivar", response_model=schemas.ProductoResponse)
def desactivar_producto(producto_id: int, db: Session = Depends(get_db)):
    """
    **Desactivar Producto**:
    Cambia el estado del producto a INACTIVO.
    """
    prod = crud.toggle_producto_estado(db, producto_id, "INACTIVO")
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return prod

@router.patch("/{producto_id}/activar", response_model=schemas.ProductoResponse)
def activar_producto(producto_id: int, db: Session = Depends(get_db)):
    """
    **Activar Producto**:
    Reactiva un producto inhabilitado.
    """
    prod = crud.toggle_producto_estado(db, producto_id, "ACTIVO")
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return prod
