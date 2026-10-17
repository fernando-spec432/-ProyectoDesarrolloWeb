-- ==========================================
-- SCRIPT DE DATOS INICIALES (SEMILLA / SEED)
-- Motor: PostgreSQL
-- Proyecto: Sistema de Gestión de Supermercado (7 Módulos)
-- ==========================================

-- 1. Usuario Administrador por Defecto
INSERT INTO usuarios (id, username, email, password, nombre_completo, rol, estado) VALUES
(1, 'admin', 'admin@supermercado.com', 'admin123', 'Administrador Principal', 'ADMINISTRADOR', 'ACTIVO')
ON CONFLICT (username) DO NOTHING;

-- 2. Módulo 2: Categorías de Supermercado (Ejemplos solicitados)
INSERT INTO categorias (id, codigo, nombre, descripcion, estado) VALUES
(1, 'CAT-01', 'Bebidas', 'Aguas, jugos, refrescos, cafés y bebidas energizantes', 'ACTIVO'),
(2, 'CAT-02', 'Lácteos', 'Leche, quesos, yogur, mantequilla y derivados', 'ACTIVO'),
(3, 'CAT-03', 'Carnes', 'Carne de res, pollo, cerdo y embutidos frescos', 'ACTIVO'),
(4, 'CAT-04', 'Frutas', 'Frutas frescas de temporada e importadas', 'ACTIVO'),
(5, 'CAT-05', 'Verduras', 'Hortalizas, legumbres y verduras frescas', 'ACTIVO'),
(6, 'CAT-06', 'Limpieza', 'Detergentes, desinfectantes y artículos de aseo del hogar', 'ACTIVO'),
(7, 'CAT-07', 'Higiene Personal', 'Jabones, champú, pasta dental y cuidado personal', 'ACTIVO'),
(8, 'CAT-08', 'Panadería', 'Pan fresco, repostería, tostadas y galletas', 'ACTIVO'),
(9, 'CAT-09', 'Congelados', 'Alimentos ultracongelados, helados y comidas preparadas', 'ACTIVO'),
(10, 'CAT-10', 'Abarrotes', 'Arroz, frijoles, pasta, aceites, granos y enlatados', 'ACTIVO')
ON CONFLICT (id) DO NOTHING;

-- 3. Módulo 4: Proveedores
INSERT INTO proveedores (id, nombre_proveedor, nit, nombre_contacto, telefono, correo, direccion, estado) VALUES
(1, 'Distribuidora Lácteos Central S.A.', '1234567-8', 'Carlos Mendoza', '5555-1111', 'contacto@lacteoscentral.com', 'Zona 12, Ciudad Guatemala', 'ACTIVO'),
(2, 'Panificadora El Buen Trigo', '9876543-2', 'Marta Gómez', '5555-2222', 'ventas@elbuentrigo.com', 'Zona 4, Mixco', 'ACTIVO'),
(3, 'Importadora Bebidas & Café S.A.', '4567890-1', 'Luis Fernando', '5555-3333', 'pedidos@bebidascafe.gt', 'Zona 10, Ciudad Guatemala', 'ACTIVO'),
(4, 'Agrícola Frutas y Verduras del Valle', '3216549-0', 'Sofía López', '5555-4444', 'contacto@delvalle.com', 'Chimaltenango, Guatemala', 'ACTIVO')
ON CONFLICT (id) DO NOTHING;

-- 4. Módulo 3: Clientes
INSERT INTO clientes (id, nombres, apellidos, nit, telefono, correo, direccion, estado) VALUES
(1, 'Juan', 'Pérez', '458921-9', '5512-3456', 'juan.perez@gmail.com', 'Zona 7, Ciudad Guatemala', 'ACTIVO'),
(2, 'Ana', 'Gómez', '789123-4', '5598-7654', 'ana.gomez@hotmail.com', 'Zona 11, Las Majadas', 'ACTIVO'),
(3, 'Consumidor', 'Final', 'CF', '0000-0000', 'cf@supermercado.com', 'Ciudad', 'ACTIVO')
ON CONFLICT (id) DO NOTHING;

-- 5. Módulo 1: Productos Registrados
INSERT INTO productos 
(id, codigo, nombre, descripcion, categoria_id, precio_compra, precio_venta, existencia, stock_minimo, estado) 
VALUES
(1, 'PROD-1001', 'Leche Entera 1L', 'Leche de vaca pasteurizada 1 Litro', 2, 8.00, 12.00, 50, 10, 'ACTIVO'),
(2, 'PROD-1002', 'Pan Dulce Artesanal', 'Bolsa de pan variado 6 unidades', 8, 3.00, 5.00, 40, 15, 'ACTIVO'),
(3, 'PROD-1003', 'Café Tostado y Molido 500g', 'Café 100% puro tueste medio', 1, 22.00, 35.00, 25, 5, 'ACTIVO'),
(4, 'PROD-1004', 'Arroz Blanco Grano Entero 1kg', 'Arroz superior 1kg', 10, 10.00, 15.00, 100, 20, 'ACTIVO'),
(5, 'PROD-1005', 'Aceite Vegetal 900ml', 'Aceite 100% puro libre de colesterol', 10, 18.00, 26.00, 30, 10, 'ACTIVO'),
(6, 'PROD-1006', 'Pechuga de Pollo Fresca 1kg', 'Pechuga de pollo deshuesada', 3, 30.00, 45.00, 15, 5, 'ACTIVO'),
(7, 'PROD-1007', 'Manzana Roja Importada (Kg)', 'Manzana fresca calidad extra', 4, 12.00, 19.50, 4, 10, 'ACTIVO'), -- Stock crítico
(8, 'PROD-1008', 'Detergente Multiusos 2kg', 'Detergente en polvo para ropa', 6, 25.00, 36.00, 20, 5, 'ACTIVO'),
(9, 'PROD-1009', 'Jabón Corporal Menta 120g', 'Jabón humectante en barra', 7, 4.00, 7.50, 0, 10, 'INACTIVO')
ON CONFLICT (id) DO NOTHING;

-- Reset de secuencias para PostgreSQL
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));
SELECT setval('categorias_id_seq', (SELECT MAX(id) FROM categorias));
SELECT setval('proveedores_id_seq', (SELECT MAX(id) FROM proveedores));
SELECT setval('clientes_id_seq', (SELECT MAX(id) FROM clientes));
SELECT setval('productos_id_seq', (SELECT MAX(id) FROM productos));

-- 6. Módulo 5: Registro de Compra Inicial
INSERT INTO compras (id, numero_compra, proveedor_id, usuario_id, fecha, total, estado) VALUES
(1, 'CMP-2026-001', 1, 1, CURRENT_TIMESTAMP, 620.00, 'COMPLETADA')
ON CONFLICT (id) DO NOTHING;

INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio_compra, subtotal) VALUES
(1, 1, 50, 8.00, 400.00),
(1, 3, 10, 22.00, 220.00);

SELECT setval('compras_id_seq', (SELECT MAX(id) FROM compras));

-- 7. Módulo 6: Registro de Ejemplo de Venta (#1050 Cliente: Juan Pérez)
INSERT INTO ventas (id, numero_venta, cliente_id, usuario_id, fecha, total, estado) VALUES
(1050, 'VTA-1050', 1, 1, CURRENT_TIMESTAMP, 74.00, 'COMPLETADA')
ON CONFLICT (id) DO NOTHING;

INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES
(1050, 1, 2, 12.00, 24.00), -- Leche: 2 x Q12.00 = Q24.00
(1050, 2, 3, 5.00, 15.00),  -- Pan: 3 x Q5.00 = Q15.00
(1050, 3, 1, 35.00, 35.00); -- Café: 1 x Q35.00 = Q35.00

SELECT setval('ventas_id_seq', (SELECT MAX(id) FROM ventas));
