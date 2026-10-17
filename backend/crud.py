from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, func
from models import (
    Producto, Categoria, Cliente, Proveedor,
    Compra, DetalleCompra, Venta, DetalleVenta, Usuario
)
from schemas import (
    ProductoCreate, ProductoUpdate,
    CategoriaCreate, CategoriaUpdate,
    ClienteCreate, ClienteUpdate,
    ProveedorCreate, ProveedorUpdate,
    CompraCreate, VentaCreate
)
from typing import Optional, List
import datetime

# ==========================================
# MÓDULO 2: CATEGORÍAS CRUD
# ==========================================
def get_categoria(db: Session, categoria_id: int) -> Optional[Categoria]:
    return db.query(Categoria).filter(Categoria.id == categoria_id).first()

def get_categorias(db: Session, search: Optional[str] = None, estado: Optional[str] = None) -> List[Categoria]:
    query = db.query(Categoria)
    if estado:
        query = query.filter(Categoria.estado == estado)
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Categoria.nombre.ilike(search_fmt),
                Categoria.codigo.ilike(search_fmt),
                Categoria.descripcion.ilike(search_fmt)
            )
        )
    return query.order_by(Categoria.nombre.asc()).all()

def create_categoria(db: Session, categoria: CategoriaCreate) -> Categoria:
    if not categoria.codigo:
        count = db.query(Categoria).count()
        categoria.codigo = f"CAT-{count + 1:02d}"
    db_cat = Categoria(
        codigo=categoria.codigo,
        nombre=categoria.nombre,
        descripcion=categoria.descripcion,
        estado=categoria.estado
    )
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

def update_categoria(db: Session, categoria_id: int, categoria_update: CategoriaUpdate) -> Optional[Categoria]:
    db_cat = get_categoria(db, categoria_id)
    if not db_cat:
        return None
    update_data = categoria_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_cat, field, value)
    db.commit()
    db.refresh(db_cat)
    return db_cat

def toggle_categoria_estado(db: Session, categoria_id: int, nuevo_estado: str) -> Optional[Categoria]:
    db_cat = get_categoria(db, categoria_id)
    if not db_cat:
        return None
    db_cat.estado = nuevo_estado
    db.commit()
    db.refresh(db_cat)
    return db_cat


# ==========================================
# MÓDULO 1: PRODUCTOS CRUD
# ==========================================
def get_producto_by_id(db: Session, producto_id: int) -> Optional[Producto]:
    return db.query(Producto).options(joinedload(Producto.categoria)).filter(Producto.id == producto_id).first()

def get_producto_by_codigo(db: Session, codigo: str) -> Optional[Producto]:
    return db.query(Producto).options(joinedload(Producto.categoria)).filter(Producto.codigo == codigo).first()

def get_productos(
    db: Session,
    skip: int = 0,
    limit: int = 200,
    search: Optional[str] = None,
    categoria_id: Optional[int] = None,
    estado: Optional[str] = None
) -> List[Producto]:
    query = db.query(Producto).options(joinedload(Producto.categoria))

    if estado:
        query = query.filter(Producto.estado == estado)

    if categoria_id:
        query = query.filter(Producto.categoria_id == categoria_id)

    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Producto.nombre.ilike(search_fmt),
                Producto.codigo.ilike(search_fmt),
                Producto.descripcion.ilike(search_fmt)
            )
        )

    return query.order_by(Producto.id.desc()).offset(skip).limit(limit).all()

def create_producto(db: Session, producto: ProductoCreate) -> Producto:
    db_prod = Producto(
        codigo=producto.codigo,
        nombre=producto.nombre,
        descripcion=producto.descripcion,
        categoria_id=producto.categoria_id,
        precio_compra=producto.precio_compra,
        precio_venta=producto.precio_venta,
        existencia=producto.existencia,
        stock_minimo=producto.stock_minimo,
        estado=producto.estado
    )
    db.add(db_prod)
    db.commit()
    db.refresh(db_prod)
    return get_producto_by_id(db, db_prod.id)

def update_producto(db: Session, producto_id: int, producto_update: ProductoUpdate) -> Optional[Producto]:
    db_prod = db.query(Producto).filter(Producto.id == producto_id).first()
    if not db_prod:
        return None

    update_data = producto_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_prod, field, value)

    db.commit()
    db.refresh(db_prod)
    return get_producto_by_id(db, db_prod.id)

def toggle_producto_estado(db: Session, producto_id: int, nuevo_estado: str) -> Optional[Producto]:
    db_prod = db.query(Producto).filter(Producto.id == producto_id).first()
    if not db_prod:
        return None

    db_prod.estado = nuevo_estado
    db.commit()
    db.refresh(db_prod)
    return get_producto_by_id(db, db_prod.id)


# ==========================================
# MÓDULO 3: CLIENTES CRUD
# ==========================================
def get_cliente(db: Session, cliente_id: int) -> Optional[Cliente]:
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()

def get_clientes(db: Session, search: Optional[str] = None, estado: Optional[str] = None) -> List[Cliente]:
    query = db.query(Cliente)
    if estado:
        query = query.filter(Cliente.estado == estado)
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Cliente.nombres.ilike(search_fmt),
                Cliente.apellidos.ilike(search_fmt),
                Cliente.nit.ilike(search_fmt),
                Cliente.correo.ilike(search_fmt)
            )
        )
    return query.order_by(Cliente.id.desc()).all()

def create_cliente(db: Session, cliente: ClienteCreate) -> Cliente:
    db_cliente = Cliente(
        nombres=cliente.nombres,
        apellidos=cliente.apellidos,
        nit=cliente.nit or "CF",
        telefono=cliente.telefono,
        correo=cliente.correo,
        direccion=cliente.direccion,
        estado=cliente.estado
    )
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def update_cliente(db: Session, cliente_id: int, cliente_update: ClienteUpdate) -> Optional[Cliente]:
    db_cliente = get_cliente(db, cliente_id)
    if not db_cliente:
        return None
    update_data = cliente_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_cliente, field, value)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente


# ==========================================
# MÓDULO 4: PROVEEDORES CRUD
# ==========================================
def get_proveedor(db: Session, proveedor_id: int) -> Optional[Proveedor]:
    return db.query(Proveedor).filter(Proveedor.id == proveedor_id).first()

def get_proveedores(db: Session, search: Optional[str] = None, estado: Optional[str] = None) -> List[Proveedor]:
    query = db.query(Proveedor)
    if estado:
        query = query.filter(Proveedor.estado == estado)
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Proveedor.nombre_proveedor.ilike(search_fmt),
                Proveedor.nit.ilike(search_fmt),
                Proveedor.nombre_contacto.ilike(search_fmt)
            )
        )
    return query.order_by(Proveedor.id.desc()).all()

def create_proveedor(db: Session, proveedor: ProveedorCreate) -> Proveedor:
    db_prov = Proveedor(
        nombre_proveedor=proveedor.nombre_proveedor,
        nit=proveedor.nit,
        nombre_contacto=proveedor.nombre_contacto,
        telefono=proveedor.telefono,
        correo=proveedor.correo,
        direccion=proveedor.direccion,
        estado=proveedor.estado
    )
    db.add(db_prov)
    db.commit()
    db.refresh(db_prov)
    return db_prov

def update_proveedor(db: Session, proveedor_id: int, proveedor_update: ProveedorUpdate) -> Optional[Proveedor]:
    db_prov = get_proveedor(db, proveedor_id)
    if not db_prov:
        return None
    update_data = proveedor_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_prov, field, value)
    db.commit()
    db.refresh(db_prov)
    return db_prov


# ==========================================
# MÓDULO 5: COMPRAS CRUD (ACTUALIZA INVENTARIO: INVENTARIO = INVENTARIO + CANTIDAD)
# ==========================================
def get_compras(db: Session) -> List[Compra]:
    return db.query(Compra).options(
        joinedload(Compra.proveedor),
        joinedload(Compra.usuario),
        joinedload(Compra.detalles).joinedload(DetalleCompra.producto)
    ).order_by(Compra.id.desc()).all()

def get_compra_by_id(db: Session, compra_id: int) -> Optional[Compra]:
    return db.query(Compra).options(
        joinedload(Compra.proveedor),
        joinedload(Compra.usuario),
        joinedload(Compra.detalles).joinedload(DetalleCompra.producto)
    ).filter(Compra.id == compra_id).first()

def create_compra(db: Session, compra_in: CompraCreate) -> Compra:
    # Generar número de compra si no viene especificado
    if not compra_in.numero_compra:
        count = db.query(Compra).count()
        compra_in.numero_compra = f"CMP-{datetime.datetime.now().year}-{count + 1:03d}"

    total_compra = 0.0
    detalles_db = []

    # Procesar items y verificar productos
    for item in compra_in.detalles:
        producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
        if not producto:
            raise ValueError(f"Producto con ID {item.producto_id} no existe.")

        subtotal = item.cantidad * item.precio_compra
        total_compra += subtotal

        # Regla Módulo 5: Inventario = Inventario + Cantidad comprada
        producto.existencia += item.cantidad
        # Actualizar precio de compra más reciente si aplica
        producto.precio_compra = item.precio_compra

        detalle_db = DetalleCompra(
            producto_id=item.producto_id,
            cantidad=item.cantidad,
            precio_compra=item.precio_compra,
            subtotal=subtotal
        )
        detalles_db.append(detalle_db)

    compra_db = Compra(
        numero_compra=compra_in.numero_compra,
        proveedor_id=compra_in.proveedor_id,
        usuario_id=compra_in.usuario_id,
        total=total_compra,
        estado="COMPLETADA",
        detalles=detalles_db
    )

    db.add(compra_db)
    db.commit()
    db.refresh(compra_db)
    return get_compra_by_id(db, compra_db.id)


# ==========================================
# MÓDULO 6: VENTAS CRUD (ACTUALIZA INVENTARIO: INVENTARIO = INVENTARIO - CANTIDAD)
# REGLA DE NEGOCIO: No permitir venta sin suficiente inventario
# ==========================================
def get_ventas(db: Session) -> List[Venta]:
    return db.query(Venta).options(
        joinedload(Venta.cliente),
        joinedload(Venta.usuario),
        joinedload(Venta.detalles).joinedload(DetalleVenta.producto)
    ).order_by(Venta.id.desc()).all()

def get_venta_by_id(db: Session, venta_id: int) -> Optional[Venta]:
    return db.query(Venta).options(
        joinedload(Venta.cliente),
        joinedload(Venta.usuario),
        joinedload(Venta.detalles).joinedload(DetalleVenta.producto)
    ).filter(Venta.id == venta_id).first()

def create_venta(db: Session, venta_in: VentaCreate) -> Venta:
    if not venta_in.numero_venta:
        count = db.query(Venta).count()
        venta_in.numero_venta = f"VTA-{1050 + count + 1}"

    total_venta = 0.0
    detalles_db = []

    # Validar existencias de TODOS los productos antes de realizar modificaciones
    for item in venta_in.detalles:
        producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
        if not producto:
            raise ValueError(f"El producto con ID {item.producto_id} no fue encontrado.")

        if producto.estado != "ACTIVO":
            raise ValueError(f"El producto '{producto.nombre}' está INACTIVO y no se puede vender.")

        # REGLA DE NEGOCIO CRÍTICA: Validar inventario suficiente
        if producto.existencia < item.cantidad:
            raise ValueError(
                f"No hay suficiente inventario para el producto '{producto.nombre}'. "
                f"Stock actual: {producto.existencia}, Solicitado: {item.cantidad}"
            )

        subtotal = item.cantidad * item.precio
        total_venta += subtotal

        # Regla Módulo 6: Inventario = Inventario - Cantidad vendida
        producto.existencia -= item.cantidad

        detalle_db = DetalleVenta(
            producto_id=item.producto_id,
            cantidad=item.cantidad,
            precio=item.precio,
            subtotal=subtotal
        )
        detalles_db.append(detalle_db)

    venta_db = Venta(
        numero_venta=venta_in.numero_venta,
        cliente_id=venta_in.cliente_id,
        usuario_id=venta_in.usuario_id,
        total=total_venta,
        estado="COMPLETADA",
        detalles=detalles_db
    )

    db.add(venta_db)
    db.commit()
    db.refresh(venta_db)
    return get_venta_by_id(db, venta_db.id)


# ==========================================
# MÓDULO 7: INVENTARIO CRUD
# ==========================================
def get_inventario_general(db: Session) -> List[dict]:
    productos = db.query(Producto).options(joinedload(Producto.categoria)).all()
    resultado = []
    for p in productos:
        if p.existencia == 0:
            estado_inv = "AGOTADO"
        elif p.existencia <= p.stock_minimo:
            estado_inv = "STOCK BAJO"
        else:
            estado_inv = "SUFICIENTE"

        resultado.append({
            "producto_id": p.id,
            "codigo": p.codigo,
            "producto_nombre": p.nombre,
            "categoria_nombre": p.categoria.nombre if p.categoria else "Sin Categoría",
            "precio_compra": float(p.precio_compra),
            "precio_venta": float(p.precio_venta),
            "existencia": p.existencia,
            "stock_minimo": p.stock_minimo,
            "estado_producto": p.estado,
            "estado_inventario": estado_inv
        })
    return resultado

def get_productos_stock_critico(db: Session) -> List[dict]:
    prods = db.query(Producto).options(joinedload(Producto.categoria)).filter(
        Producto.existencia <= Producto.stock_minimo,
        Producto.estado == "ACTIVO"
    ).all()

    results = []
    for p in prods:
        results.append({
            "id": p.id,
            "codigo": p.codigo,
            "nombre": p.nombre,
            "categoria_nombre": p.categoria.nombre if p.categoria else "Sin Categoría",
            "existencia": p.existencia,
            "stock_minimo": p.stock_minimo,
            "faltante": max(0, p.stock_minimo - p.existencia)
        })
    return results
