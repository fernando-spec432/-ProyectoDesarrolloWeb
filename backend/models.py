from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False, unique=True, index=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    nombre_completo = Column(String(150), nullable=False)
    rol = Column(String(50), nullable=False, default="ADMINISTRADOR")
    estado = Column(String(20), nullable=False, default="ACTIVO")
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())

    compras = relationship("Compra", back_populates="usuario")
    ventas = relationship("Venta", back_populates="usuario")


class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), nullable=True, unique=True)
    nombre = Column(String(100), nullable=False, unique=True)
    descripcion = Column(Text, nullable=True)
    estado = Column(String(20), nullable=False, default="ACTIVO")
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())

    productos = relationship("Producto", back_populates="categoria")


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), nullable=False, unique=True, index=True)
    nombre = Column(String(150), nullable=False, index=True)
    descripcion = Column(Text, nullable=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id", ondelete="SET NULL"), nullable=True)
    precio_compra = Column(Numeric(10, 2), nullable=False)
    precio_venta = Column(Numeric(10, 2), nullable=False)
    existencia = Column(Integer, nullable=False, default=0)
    stock_minimo = Column(Integer, nullable=False, default=0)
    estado = Column(String(20), nullable=False, default="ACTIVO", index=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    categoria = relationship("Categoria", back_populates="productos")
    detalles_compra = relationship("DetalleCompra", back_populates="producto")
    detalles_venta = relationship("DetalleVenta", back_populates="producto")


class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)
    nit = Column(String(20), nullable=True, default="CF", index=True)
    telefono = Column(String(20), nullable=True)
    correo = Column(String(100), nullable=True)
    direccion = Column(Text, nullable=True)
    estado = Column(String(20), nullable=False, default="ACTIVO")
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())

    ventas = relationship("Venta", back_populates="cliente")


class Proveedor(Base):
    __tablename__ = "proveedores"

    id = Column(Integer, primary_key=True, index=True)
    nombre_proveedor = Column(String(150), nullable=False)
    nit = Column(String(20), nullable=True, index=True)
    nombre_contacto = Column(String(100), nullable=True)
    telefono = Column(String(20), nullable=True)
    correo = Column(String(100), nullable=True)
    direccion = Column(Text, nullable=True)
    estado = Column(String(20), nullable=False, default="ACTIVO")
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())

    compras = relationship("Compra", back_populates="proveedor")


class Compra(Base):
    __tablename__ = "compras"

    id = Column(Integer, primary_key=True, index=True)
    numero_compra = Column(String(50), nullable=False, unique=True, index=True)
    proveedor_id = Column(Integer, ForeignKey("proveedores.id", ondelete="RESTRICT"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="RESTRICT"), nullable=False)
    fecha = Column(DateTime(timezone=True), server_default=func.now())
    total = Column(Numeric(10, 2), nullable=False, default=0.0)
    estado = Column(String(20), nullable=False, default="COMPLETADA")

    proveedor = relationship("Proveedor", back_populates="compras")
    usuario = relationship("Usuario", back_populates="compras")
    detalles = relationship("DetalleCompra", back_populates="compra", cascade="all, delete-orphan")


class DetalleCompra(Base):
    __tablename__ = "detalle_compras"

    id = Column(Integer, primary_key=True, index=True)
    compra_id = Column(Integer, ForeignKey("compras.id", ondelete="CASCADE"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id", ondelete="RESTRICT"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    precio_compra = Column(Numeric(10, 2), nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False)

    compra = relationship("Compra", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles_compra")


class Venta(Base):
    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)
    numero_venta = Column(String(50), nullable=False, unique=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id", ondelete="RESTRICT"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="RESTRICT"), nullable=False)
    fecha = Column(DateTime(timezone=True), server_default=func.now())
    total = Column(Numeric(10, 2), nullable=False, default=0.0)
    estado = Column(String(20), nullable=False, default="COMPLETADA")

    cliente = relationship("Cliente", back_populates="ventas")
    usuario = relationship("Usuario", back_populates="ventas")
    detalles = relationship("DetalleVenta", back_populates="venta", cascade="all, delete-orphan")


class DetalleVenta(Base):
    __tablename__ = "detalle_ventas"

    id = Column(Integer, primary_key=True, index=True)
    venta_id = Column(Integer, ForeignKey("ventas.id", ondelete="CASCADE"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id", ondelete="RESTRICT"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    precio = Column(Numeric(10, 2), nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False)

    venta = relationship("Venta", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles_venta")
