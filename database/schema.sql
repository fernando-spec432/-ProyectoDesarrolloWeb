-- Configurar zona horaria por defecto para la base de datos (Guatemala / Centroamérica UTC-6)
SET timezone = 'America/Guatemala';

-- 1. Eliminación de tablas existentes en orden de dependencia inversa
DROP VIEW IF EXISTS vista_inventario CASCADE;
DROP VIEW IF EXISTS vista_productos_stock_critico CASCADE;

DROP TABLE IF EXISTS detalle_ventas CASCADE;
DROP TABLE IF EXISTS ventas CASCADE;
DROP TABLE IF EXISTS detalle_compras CASCADE;
DROP TABLE IF EXISTS compras CASCADE;
DROP TABLE IF EXISTS proveedores CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 2. Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'ADMINISTRADOR',
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Módulo 2: Tabla de Categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Módulo 1: Tabla de Productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    precio_compra NUMERIC(10, 2) NOT NULL CHECK (precio_compra >= 0),
    precio_venta NUMERIC(10, 2) NOT NULL CHECK (precio_venta >= 0),
    existencia INT NOT NULL DEFAULT 0 CHECK (existencia >= 0),
    stock_minimo INT NOT NULL DEFAULT 0 CHECK (stock_minimo >= 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Módulo 3: Tabla de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nit VARCHAR(20) DEFAULT 'CF',
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Módulo 4: Tabla de Proveedores
CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre_proveedor VARCHAR(150) NOT NULL,
    nit VARCHAR(20),
    nombre_contacto VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Módulo 5: Tabla de Compras (Encabezado)
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    numero_compra VARCHAR(50) NOT NULL UNIQUE,
    proveedor_id INT NOT NULL REFERENCES proveedores(id) ON DELETE RESTRICT,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'COMPLETADA' CHECK (estado IN ('COMPLETADA', 'ANULADA'))
);

-- Detalle de Compras
CREATE TABLE detalle_compras (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL REFERENCES compras(id) ON DELETE CASCADE,
    producto_id INT NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_compra NUMERIC(10, 2) NOT NULL CHECK (precio_compra >= 0),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0)
);

-- 8. Módulo 6: Tabla de Ventas (Encabezado)
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    numero_venta VARCHAR(50) NOT NULL UNIQUE,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'COMPLETADA' CHECK (estado IN ('COMPLETADA', 'ANULADA'))
);

-- Detalle de Ventas
CREATE TABLE detalle_ventas (
    id SERIAL PRIMARY KEY,
    venta_id INT NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id INT NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0)
);

-- 9. Índices para Optimización
CREATE INDEX idx_productos_codigo ON productos(codigo);
CREATE INDEX idx_productos_nombre ON productos(LOWER(nombre));
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_estado ON productos(estado);
CREATE INDEX idx_clientes_nit ON clientes(nit);
CREATE INDEX idx_proveedores_nit ON proveedores(nit);
CREATE INDEX idx_compras_numero ON compras(numero_compra);
CREATE INDEX idx_ventas_numero ON ventas(numero_venta);

-- 10. Trigger para fecha_actualizacion en productos
CREATE OR REPLACE FUNCTION update_fecha_actualizacion_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_productos_fecha_actualizacion
BEFORE UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion_column();

-- 11. Módulo 7: Vista de Inventario General y Alertas
CREATE OR REPLACE VIEW vista_inventario AS
SELECT 
    p.id AS producto_id,
    p.codigo,
    p.nombre AS producto,
    c.nombre AS categoria,
    p.precio_compra,
    p.precio_venta,
    p.existencia,
    p.stock_minimo,
    p.estado AS estado_producto,
    CASE 
        WHEN p.existencia = 0 THEN 'AGOTADO'
        WHEN p.existencia <= p.stock_minimo THEN 'STOCK BAJO'
        ELSE 'SUFICIENTE'
    END AS estado_inventario
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id;

CREATE OR REPLACE VIEW vista_productos_stock_critico AS
SELECT 
    p.id,
    p.codigo,
    p.nombre,
    c.nombre AS categoria,
    p.existencia,
    p.stock_minimo,
    (p.stock_minimo - p.existencia) AS faltante
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id
WHERE p.existencia <= p.stock_minimo AND p.estado = 'ACTIVO';
