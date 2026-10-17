-- ==========================================
-- EJEMPLOS DE CONSULTAS SQL PARA CADA MÓDULO (1 AL 7)
-- Motor: PostgreSQL
-- Proyecto: Sistema de Gestión de Supermercado
-- ==========================================

-- ------------------------------------------
-- MÓDULO 1: PRODUCTOS
-- ------------------------------------------
-- 1. Registrar Producto
INSERT INTO productos (codigo, nombre, descripcion, categoria_id, precio_compra, precio_venta, existencia, stock_minimo, estado)
VALUES ('PROD-2001', 'Yogur de Fresa 1L', 'Yogur bebible sabor fresa', 2, 9.00, 14.50, 30, 8, 'ACTIVO');

-- 2. Consultar Productos con Categoría
SELECT p.id, p.codigo, p.nombre, c.nombre AS categoria, p.precio_compra, p.precio_venta, p.existencia, p.stock_minimo, p.estado
FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id
ORDER BY p.id DESC;

-- 3. Buscar Productos (por texto o categoría)
SELECT p.* FROM productos p
WHERE (LOWER(p.nombre) LIKE LOWER('%Leche%') OR LOWER(p.codigo) LIKE LOWER('%Leche%')) AND p.estado = 'ACTIVO';

-- 4. Modificar y Desactivar Producto
UPDATE productos SET nombre = 'Leche Entera 1.5L', precio_venta = 18.00 WHERE id = 1;
UPDATE productos SET estado = 'INACTIVO' WHERE id = 1;


-- ------------------------------------------
-- MÓDULO 2: CATEGORÍAS
-- ------------------------------------------
-- 1. Registrar Categoría
INSERT INTO categorias (codigo, nombre, descripcion, estado)
VALUES ('CAT-11', 'Snacks y Golosinas', 'Papas, chocolates, galletas y caramelos', 'ACTIVO');

-- 2. Consultar Categorías
SELECT id, codigo, nombre, descripcion, estado FROM categorias ORDER BY nombre ASC;


-- ------------------------------------------
-- MÓDULO 3: CLIENTES
-- ------------------------------------------
-- 1. Registrar Cliente
INSERT INTO clientes (nombres, apellidos, nit, telefono, correo, direccion)
VALUES ('Mario', 'Gómez', '654321-7', '5544-3322', 'mario.gomez@gmail.com', 'Zona 1, Guatemala');

-- 2. Consultar y Buscar Clientes
SELECT id, nombres, apellidos, nit, telefono, correo, direccion, fecha_registro FROM clientes
WHERE LOWER(nombres) LIKE '%mario%' OR nit LIKE '%654321%';


-- ------------------------------------------
-- MÓDULO 4: PROVEEDORES
-- ------------------------------------------
-- 1. Registrar Proveedor
INSERT INTO proveedores (nombre_proveedor, nit, nombre_contacto, telefono, correo, direccion)
VALUES ('Distribuidora El Campo S.A.', '888999-1', 'Roberto Morales', '5566-7788', 'ventas@elcampo.com', 'Escuintla, Guatemala');

-- 2. Consultar Proveedores
SELECT id, nombre_proveedor, nit, nombre_contacto, telefono, correo, estado FROM proveedores;


-- ------------------------------------------
-- MÓDULO 5: COMPRAS CON DETALLE (AUMENTA INVENTARIO)
-- ------------------------------------------
-- 1. Registrar Encabezado de Compra
INSERT INTO compras (numero_compra, proveedor_id, usuario_id, total)
VALUES ('CMP-2026-002', 1, 1, 160.00) RETURNING id;

-- 2. Registrar Detalle de Compra y Actualizar Inventario (+ Cantidad)
INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio_compra, subtotal)
VALUES (2, 1, 20, 8.00, 160.00);

UPDATE productos SET existencia = existencia + 20 WHERE id = 1;


-- ------------------------------------------
-- MÓDULO 6: VENTAS CON DETALLE (DISMINUYE INVENTARIO CON REGLA DE VALIDACIÓN)
-- ------------------------------------------
-- Ejemplo de Venta #1050
SELECT v.numero_venta, c.nombres || ' ' || c.apellidos AS cliente, v.fecha, v.total
FROM ventas v JOIN clientes c ON v.cliente_id = c.id WHERE v.id = 1050;

SELECT dv.id, p.nombre AS producto, dv.cantidad, dv.precio, dv.subtotal
FROM detalle_ventas dv JOIN productos p ON dv.producto_id = p.id WHERE dv.venta_id = 1050;

-- Registrar Nueva Venta (Validar Existencia >= Cantidad previamente)
-- Paso A: Verificar Stock
SELECT existencia FROM productos WHERE id = 1; -- Ej: si existencia (50) >= cantidad (2)

-- Paso B: Registrar Venta
INSERT INTO ventas (numero_venta, cliente_id, usuario_id, total)
VALUES ('VTA-1051', 1, 1, 24.00);

INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio, subtotal)
VALUES (1051, 1, 2, 12.00, 24.00);

-- Paso C: Descontar Inventario (- Cantidad vendida)
UPDATE productos SET existencia = existencia - 2 WHERE id = 1;


-- ------------------------------------------
-- MÓDULO 7: INVENTARIO
-- ------------------------------------------
-- 1. Consultar Inventario General con estado (SUFICIENTE, STOCK BAJO, AGOTADO)
SELECT * FROM vista_inventario;

-- 2. Consultar Productos con Stock Crítico (Alerta)
SELECT * FROM vista_productos_stock_critico;
