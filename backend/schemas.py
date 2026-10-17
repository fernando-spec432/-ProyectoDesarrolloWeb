from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# --- AUTENTICACIÓN Y USUARIO ---
class LoginRequest(BaseModel):
    username: str = Field(..., description="Nombre de usuario")
    password: str = Field(..., description="Contraseña de usuario")

class ChangePasswordRequest(BaseModel):
    username: str = Field(..., description="Nombre de usuario")
    current_password: str = Field(..., description="Contraseña actual")
    new_password: str = Field(..., min_length=6, description="Nueva contraseña segura")

class UsuarioResponse(BaseModel):
    id: int
    username: str
    email: str
    nombre_completo: str
    rol: str
    estado: str

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    success: bool
    message: str
    user: Optional[UsuarioResponse] = None
    token: Optional[str] = None


# --- MÓDULO 2: CATEGORÍAS ---
class CategoriaBase(BaseModel):
    codigo: Optional[str] = Field(None, max_length=50)
    nombre: str = Field(..., max_length=100, description="Nombre de la categoría")
    descripcion: Optional[str] = Field(None, description="Descripción opcional")
    estado: str = Field("ACTIVO", pattern="^(ACTIVO|INACTIVO)$")

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(BaseModel):
    codigo: Optional[str] = None
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[str] = Field(None, pattern="^(ACTIVO|INACTIVO)$")

class CategoriaResponse(CategoriaBase):
    id: int
    fecha_creacion: Optional[datetime] = None

    class Config:
        from_attributes = True


# --- MÓDULO 1: PRODUCTOS ---
class ProductoBase(BaseModel):
    codigo: str = Field(..., max_length=50, description="Código de barras o SKU del producto")
    nombre: str = Field(..., max_length=150, description="Nombre comercial del producto")
    descripcion: Optional[str] = None
    categoria_id: Optional[int] = None
    precio_compra: float = Field(..., ge=0, description="Precio de costo o adquisición")
    precio_venta: float = Field(..., ge=0, description="Precio de venta al público")
    existencia: int = Field(0, ge=0, description="Cantidad disponible actual")
    stock_minimo: int = Field(0, ge=0, description="Stock mínimo antes de alerta")
    estado: str = Field("ACTIVO", pattern="^(ACTIVO|INACTIVO)$")

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    codigo: Optional[str] = Field(None, max_length=50)
    nombre: Optional[str] = Field(None, max_length=150)
    descripcion: Optional[str] = None
    categoria_id: Optional[int] = None
    precio_compra: Optional[float] = Field(None, ge=0)
    precio_venta: Optional[float] = Field(None, ge=0)
    existencia: Optional[int] = Field(None, ge=0)
    stock_minimo: Optional[int] = Field(None, ge=0)
    estado: Optional[str] = Field(None, pattern="^(ACTIVO|INACTIVO)$")

class ProductoResponse(ProductoBase):
    id: int
    fecha_creacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None
    categoria: Optional[CategoriaResponse] = None

    class Config:
        from_attributes = True


# --- MÓDULO 3: CLIENTES ---
class ClienteBase(BaseModel):
    nombres: str = Field(..., max_length=100)
    apellidos: str = Field(..., max_length=100)
    nit: Optional[str] = Field("CF", max_length=20)
    telefono: Optional[str] = Field(None, max_length=20)
    correo: Optional[str] = Field(None, max_length=100)
    direccion: Optional[str] = None
    estado: str = Field("ACTIVO", pattern="^(ACTIVO|INACTIVO)$")

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    nit: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None
    estado: Optional[str] = Field(None, pattern="^(ACTIVO|INACTIVO)$")

class ClienteResponse(ClienteBase):
    id: int
    fecha_registro: Optional[datetime] = None

    class Config:
        from_attributes = True


# --- MÓDULO 4: PROVEEDORES ---
class ProveedorBase(BaseModel):
    nombre_proveedor: str = Field(..., max_length=150)
    nit: Optional[str] = Field(None, max_length=20)
    nombre_contacto: Optional[str] = Field(None, max_length=100)
    telefono: Optional[str] = Field(None, max_length=20)
    correo: Optional[str] = Field(None, max_length=100)
    direccion: Optional[str] = None
    estado: str = Field("ACTIVO", pattern="^(ACTIVO|INACTIVO)$")

class ProveedorCreate(ProveedorBase):
    pass

class ProveedorUpdate(BaseModel):
    nombre_proveedor: Optional[str] = None
    nit: Optional[str] = None
    nombre_contacto: Optional[str] = None
    telefono: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None
    estado: Optional[str] = Field(None, pattern="^(ACTIVO|INACTIVO)$")

class ProveedorResponse(ProveedorBase):
    id: int
    fecha_creacion: Optional[datetime] = None

    class Config:
        from_attributes = True


# --- MÓDULO 5: COMPRAS ---
class DetalleCompraItem(BaseModel):
    producto_id: int
    cantidad: int = Field(..., gt=0)
    precio_compra: float = Field(..., ge=0)

class CompraCreate(BaseModel):
    numero_compra: Optional[str] = None
    proveedor_id: int
    usuario_id: int = 1
    detalles: List[DetalleCompraItem]

class DetalleCompraResponse(BaseModel):
    id: int
    producto_id: int
    cantidad: int
    precio_compra: float
    subtotal: float
    producto: Optional[ProductoResponse] = None

    class Config:
        from_attributes = True

class CompraResponse(BaseModel):
    id: int
    numero_compra: str
    proveedor_id: int
    usuario_id: int
    fecha: Optional[datetime] = None
    total: float
    estado: str
    proveedor: Optional[ProveedorResponse] = None
    usuario: Optional[UsuarioResponse] = None
    detalles: List[DetalleCompraResponse] = []

    class Config:
        from_attributes = True


# --- MÓDULO 6: VENTAS ---
class DetalleVentaItem(BaseModel):
    producto_id: int
    cantidad: int = Field(..., gt=0)
    precio: float = Field(..., ge=0)

class VentaCreate(BaseModel):
    numero_venta: Optional[str] = None
    cliente_id: int
    usuario_id: int = 1
    detalles: List[DetalleVentaItem]

class DetalleVentaResponse(BaseModel):
    id: int
    producto_id: int
    cantidad: int
    precio: float
    subtotal: float
    producto: Optional[ProductoResponse] = None

    class Config:
        from_attributes = True

class VentaResponse(BaseModel):
    id: int
    numero_venta: str
    cliente_id: int
    usuario_id: int
    fecha: Optional[datetime] = None
    total: float
    estado: str
    cliente: Optional[ClienteResponse] = None
    usuario: Optional[UsuarioResponse] = None
    detalles: List[DetalleVentaResponse] = []

    class Config:
        from_attributes = True


# --- MÓDULO 7: INVENTARIO ---
class InventarioItemResponse(BaseModel):
    producto_id: int
    codigo: str
    producto_nombre: str
    categoria_nombre: Optional[str] = None
    precio_compra: float
    precio_venta: float
    existencia: int
    stock_minimo: int
    estado_producto: str
    estado_inventario: str # SUFICIENTE, STOCK BAJO, AGOTADO

class StockCriticoResponse(BaseModel):
    id: int
    codigo: str
    nombre: str
    categoria_nombre: Optional[str] = None
    existencia: int
    stock_minimo: int
    faltante: int

    class Config:
        from_attributes = True
