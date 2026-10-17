# 🛒 Sistema de Gestión de Supermercado Control Pro (7 Módulos)

Sistema de información integral, moderno y desacoplado para la administración, control de inventario, compras, ventas POS y consulta de productos de supermercado.

---

## 🏗️ Arquitectura del Sistema

```
ProyectoFinalDesarrolloweb/
├── 🗄️ database/               # Scripts SQL PostgreSQL (DDL, DML, Vistas e Índices)
│   ├── schema.sql             # Estructura de las 9 tablas (productos, categorias, clientes, proveedores, compras, ventas, etc.)
│   ├── seed.sql               # Datos iniciales de prueba para los 7 módulos (ej. Venta #1050 de Juan Pérez)
│   └── queries.sql            # Ejemplos de consultas SQL CRUD para cada módulo
├── 🐍 backend/                # REST API backend en Python (FastAPI + SQLAlchemy)
│   ├── main.py                # Servidor FastAPI principal con CORS y Swagger
│   ├── config.py              # Carga de variables de entorno (.env)
│   ├── database.py            # Conexión SQLAlchemy a PostgreSQL
│   ├── models.py              # Modelos ORM (las 9 tablas)
│   ├── schemas.py             # Validaciones Pydantic v2
│   ├── crud.py                # Lógica de negocio y transacciones (Stock Compras/Ventas)
│   ├── routers/               # Endpoints REST para los 7 módulos (/api/productos, /api/ventas, etc.)
│   └── requirements.txt       # Dependencias de Python
├── 🅰️ angular-components/     # Servicio e integración cliente para Angular
│   ├── product.service.ts     # Servicio HttpClient para los 7 módulos
│   └── product-list.component.ts # Componente Angular de gestión
├── 🌐 frontend/               # Dashboard web e interfaz interactiva (SPA)
│   ├── index.html             # Interfaz visual con soporte para los 7 módulos y modo oscuro
│   ├── styles.css             # Estilos modernos con Glassmorphism y CSS Variables
│   └── app.js                 # Controlador cliente dinámico (Sincronización API + Modo Demo)
└── 📜 readme.md               # Documentación general del proyecto
```

---

## 📋 Módulos del Sistema e Información Mínima

### Módulo 1. Productos
- **Campos:** `codigo`, `nombre`, `descripcion`, `categoria_id`, `precio_compra`, `precio_venta`, `existencia`, `stock_minimo`, `estado`.
- **Operaciones:** Registrar productos, Consultar productos, Modificar productos, Desactivar/Activar productos, Buscar productos.

### Módulo 2. Categorías
- **Campos:** `codigo`, `nombre`, `descripcion`, `estado`.
- **Ejemplos incluidos:** Bebidas, Lácteos, Carnes, Frutas, Verduras, Limpieza, Higiene personal, Panadería, Congelados y Abarrotes.
- **Operaciones:** Registrar, Consultar, Modificar, Desactivar/Activar, Buscar.

### Módulo 3. Clientes
- **Campos:** `id` (Identificador), `nombres`, `apellidos`, `nit`, `telefono`, `correo`, `direccion`, `fecha_registro`, `estado`.
- **Operaciones:** Registrar clientes, Consultar clientes, Editar clientes, Buscar clientes.

### Módulo 4. Proveedores
- **Campos:** `id` (Identificador), `nombre_proveedor`, `nit`, `nombre_contacto`, `telefono`, `correo`, `direccion`, `estado`.
- **Operaciones:** Registrar proveedores, Consultar proveedores, Editar proveedores, Buscar proveedores.

### Módulo 5. Compras
- **Compra (Encabezado):** `numero_compra`, `proveedor_id`, `fecha`, `usuario_id`, `total`, `estado`.
- **Detalle de Compra:** `compra_id`, `producto_id`, `cantidad`, `precio_compra`, `subtotal`.
- **Regla de Inventario:** Al registrar una compra `Inventario = Inventario + Cantidad comprada`.

### Módulo 6. Ventas
- **Venta (Encabezado):** `numero_venta`, `fecha`, `cliente_id`, `usuario_id`, `total`, `estado`.
- **Detalle de Venta:** `venta_id`, `producto_id`, `cantidad`, `precio`, `subtotal`.
- **Ejemplo incluido en Semilla (Venta #1050):**
  - **Cliente:** Juan Pérez (NIT: 458921-9)
  - **Detalle:** Leche (2 x Q12.00 = Q24.00), Pan (3 x Q5.00 = Q15.00), Café (1 x Q35.00 = Q35.00). Total: **Q74.00**.
- **Regla de Inventario:** Al registrar una venta `Inventario = Inventario - Cantidad vendida`.
- **⚠️ Regla de negocio obligatoria:** **No se permite realizar una venta cuando no exista suficiente inventario.**

### Módulo 7. Inventario
- **Consultas:** existencias actuales, producto, categoría, existencia, stock mínimo, estado del inventario (`SUFICIENTE`, `STOCK BAJO`, `AGOTADO`).
- Actualizaciones automáticas por Compras y Ventas.

---

## 🗄️ Modelo de Datos Mínimo (9 Tablas)

1. `usuarios`
2. `categorias`
3. `productos`
4. `clientes`
5. `proveedores`
6. `compras`
7. `detalle_compras`
8. `ventas`
9. `detalle_ventas`

---

## 🚀 Guía de Instalación y Ejecución

### 1. Base de Datos (PostgreSQL)
Abre tu consola de PostgreSQL o pgAdmin y ejecuta:

```bash
# Crear base de datos
psql -U postgres -c "CREATE DATABASE supermercado_db;"

# Cargar tablas, índices, triggers y vistas (7 Módulos)
psql -U postgres -d supermercado_db -f database/schema.sql

# Cargar datos iniciales de prueba
psql -U postgres -d supermercado_db -f database/seed.sql
```

---

### 2. Backend API (Python + FastAPI)

```bash
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor backend
python main.py
```

- **Documentación Interactive Swagger UI:** `http://localhost:8000/docs`
- **Documentación ReDoc:** `http://localhost:8000/redoc`

---

### 3. Frontend / Cliente

#### Opción A: Interfaz Web Integrada (Dashboard HTML5 + JS + CSS)
Abre el archivo [`frontend/index.html`](file:///c:/Users/chris/OneDrive/Desktop/ProyectoFinalDesarrolloweb/frontend/index.html) directamente en tu navegador. Cuenta con navegación interactiva para los 7 módulos, POS Terminal con recibo impreso y modo fallback.

#### Opción B: Integración Angular
Importa los archivos de la carpeta [`angular-components/`](file:///c:/Users/chris/OneDrive/Desktop/ProyectoFinalDesarrolloweb/angular-components/) en tu proyecto Angular.