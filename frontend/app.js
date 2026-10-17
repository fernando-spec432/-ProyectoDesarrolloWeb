const API_BASE_URL = 'http://localhost:8000/api';

// --- ESTADO LOCAL EN MEMORIA (FALLBACK DEMO Y CACHÉ) ---
let localCategories = [
  { id: 1, codigo: 'CAT-01', nombre: 'Bebidas', descripcion: 'Aguas, jugos, refrescos, cafés y energizantes', estado: 'ACTIVO' },
  { id: 2, codigo: 'CAT-02', nombre: 'Lácteos', descripcion: 'Leche, quesos, yogur, mantequilla y derivados', estado: 'ACTIVO' },
  { id: 3, codigo: 'CAT-03', nombre: 'Carnes', descripcion: 'Carne de res, pollo, cerdo y embutidos frescos', estado: 'ACTIVO' },
  { id: 4, codigo: 'CAT-04', nombre: 'Frutas', descripcion: 'Frutas frescas de temporada e importadas', estado: 'ACTIVO' },
  { id: 5, codigo: 'CAT-05', nombre: 'Verduras', descripcion: 'Hortalizas, legumbres y verduras frescas', estado: 'ACTIVO' },
  { id: 6, codigo: 'CAT-06', nombre: 'Limpieza', descripcion: 'Detergentes, desinfectantes y artículos de aseo', estado: 'ACTIVO' },
  { id: 7, codigo: 'CAT-07', nombre: 'Higiene Personal', descripcion: 'Jabones, champú, pasta dental y cuidado personal', estado: 'ACTIVO' },
  { id: 8, codigo: 'CAT-08', nombre: 'Panadería', descripcion: 'Pan fresco, repostería, tostadas y galletas', estado: 'ACTIVO' },
  { id: 9, codigo: 'CAT-09', nombre: 'Congelados', descripcion: 'Alimentos ultracongelados y comidas preparadas', estado: 'ACTIVO' },
  { id: 10, codigo: 'CAT-10', nombre: 'Abarrotes', descripcion: 'Arroz, frijoles, pasta, aceites y enlatados', estado: 'ACTIVO' }
];

let localProducts = [
  { id: 1, codigo: 'PROD-1001', nombre: 'Leche Entera 1L', descripcion: 'Leche de vaca pasteurizada de 1L', categoria_id: 2, precio_compra: 8.00, precio_venta: 12.00, existencia: 50, stock_minimo: 10, estado: 'ACTIVO' },
  { id: 2, codigo: 'PROD-1002', nombre: 'Pan Dulce Artesanal', descripcion: 'Bolsa de pan variado 6 unidades', categoria_id: 8, precio_compra: 3.00, precio_venta: 5.00, existencia: 40, stock_minimo: 15, estado: 'ACTIVO' },
  { id: 3, codigo: 'PROD-1003', nombre: 'Café Tostado y Molido 500g', descripcion: 'Café 100% puro tueste medio', categoria_id: 1, precio_compra: 22.00, precio_venta: 35.00, existencia: 25, stock_minimo: 5, estado: 'ACTIVO' },
  { id: 4, codigo: 'PROD-1004', nombre: 'Arroz Blanco Grano Entero 1kg', descripcion: 'Arroz superior 1kg', categoria_id: 10, precio_compra: 10.00, precio_venta: 15.00, existencia: 100, stock_minimo: 20, estado: 'ACTIVO' },
  { id: 5, codigo: 'PROD-1005', nombre: 'Aceite Vegetal 900ml', descripcion: 'Aceite 100% puro libre de colesterol', categoria_id: 10, precio_compra: 18.00, precio_venta: 26.00, existencia: 30, stock_minimo: 10, estado: 'ACTIVO' },
  { id: 6, codigo: 'PROD-1006', nombre: 'Pechuga de Pollo Fresca 1kg', descripcion: 'Pechuga deshuesada', categoria_id: 3, precio_compra: 30.00, precio_venta: 45.00, existencia: 15, stock_minimo: 5, estado: 'ACTIVO' },
  { id: 7, codigo: 'PROD-1007', nombre: 'Manzana Roja Importada (Kg)', descripcion: 'Manzana roja de temporada', categoria_id: 4, precio_compra: 12.00, precio_venta: 19.50, existencia: 4, stock_minimo: 10, estado: 'ACTIVO' },
  { id: 8, codigo: 'PROD-1008', nombre: 'Detergente Multiusos 2kg', descripcion: 'Detergente en polvo para ropa', categoria_id: 6, precio_compra: 25.00, precio_venta: 36.00, existencia: 20, stock_minimo: 5, estado: 'ACTIVO' },
  { id: 9, codigo: 'PROD-1009', nombre: 'Jabón Corporal Menta 120g', descripcion: 'Jabón en barra', categoria_id: 7, precio_compra: 4.00, precio_venta: 7.50, existencia: 0, stock_minimo: 10, estado: 'INACTIVO' }
];

let localClients = [
  { id: 1, nombres: 'Juan', apellidos: 'Pérez', nit: '458921-9', telefono: '5512-3456', correo: 'juan.perez@gmail.com', direccion: 'Zona 7, Guatemala', estado: 'ACTIVO' },
  { id: 2, nombres: 'Ana', apellidos: 'Gómez', nit: '789123-4', telefono: '5598-7654', correo: 'ana.gomez@hotmail.com', direccion: 'Zona 11, Guatemala', estado: 'ACTIVO' },
  { id: 3, nombres: 'Consumidor', apellidos: 'Final', nit: 'CF', telefono: '0000-0000', correo: 'cf@supermercado.com', direccion: 'Ciudad', estado: 'ACTIVO' }
];

let localSuppliers = [
  { id: 1, nombre_proveedor: 'Distribuidora Lácteos Central S.A.', nit: '1234567-8', nombre_contacto: 'Carlos Mendoza', telefono: '5555-1111', correo: 'contacto@lacteoscentral.com', direccion: 'Zona 12', estado: 'ACTIVO' },
  { id: 2, nombre_proveedor: 'Panificadora El Buen Trigo', nit: '9876543-2', nombre_contacto: 'Marta Gómez', telefono: '5555-2222', correo: 'ventas@elbuentrigo.com', direccion: 'Zona 4', estado: 'ACTIVO' },
  { id: 3, nombre_proveedor: 'Importadora Bebidas & Café S.A.', nit: '4567890-1', nombre_contacto: 'Luis Fernando', telefono: '5555-3333', correo: 'pedidos@bebidascafe.gt', direccion: 'Zona 10', estado: 'ACTIVO' }
];

let localPurchases = [
  {
    id: 1,
    numero_compra: 'CMP-2026-001',
    proveedor_id: 1,
    proveedor: { nombre_proveedor: 'Distribuidora Lácteos Central S.A.' },
    usuario: { nombre_completo: 'Administrador' },
    fecha: '2026-10-03T08:00:00',
    total: 620.00,
    estado: 'COMPLETADA',
    detalles: [
      { id: 1, producto_id: 1, producto: { nombre: 'Leche Entera 1L' }, cantidad: 50, precio_compra: 8.00, subtotal: 400.00 },
      { id: 2, producto_id: 3, producto: { nombre: 'Café Tostado y Molido 500g' }, cantidad: 10, precio_compra: 22.00, subtotal: 220.00 }
    ]
  }
];

let localSales = [
  {
    id: 1050,
    numero_venta: 'VTA-1050',
    cliente_id: 1,
    cliente: { nombres: 'Juan', apellidos: 'Pérez', nit: '458921-9' },
    usuario: { nombre_completo: 'Administrador' },
    fecha: '2026-10-03T09:15:00',
    total: 74.00,
    estado: 'COMPLETADA',
    detalles: [
      { id: 1, producto_id: 1, producto: { nombre: 'Leche Entera 1L' }, cantidad: 2, precio: 12.00, subtotal: 24.00 },
      { id: 2, producto_id: 2, producto: { nombre: 'Pan Dulce Artesanal' }, cantidad: 3, precio: 5.00, subtotal: 15.00 },
      { id: 3, producto_id: 3, producto: { nombre: 'Café Tostado y Molido 500g' }, cantidad: 1, precio: 35.00, subtotal: 35.00 }
    ]
  }
];

let posCart = [];
let purchaseCartItems = [];
let isLiveBackend = false;
let currentUser = null;

// --- INICIALIZACIÓN DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  checkSession();
  setupEventListeners();
});

function initTheme() {
  const savedTheme = localStorage.getItem('supermercado_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  updateThemeButton();
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('supermercado_theme', isDark ? 'dark' : 'light');
  updateThemeButton();
}

function updateThemeButton() {
  const isDark = document.body.classList.contains('dark-mode');
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  if (text) text.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
}

function checkSession() {
  const savedUser = localStorage.getItem('supermercado_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showScreen('dashboardScreen');
    updateUserProfileDisplay();
    checkBackendConnection();
  } else {
    showScreen('loginScreen');
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.view-screen').forEach(el => el.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const submitBtn = document.getElementById('loginSubmitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Verificando...';

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        currentUser = data.user;
        localStorage.setItem('supermercado_user', JSON.stringify(currentUser));
        localStorage.setItem('supermercado_token', data.token);
        
        showScreen('dashboardScreen');
        updateUserProfileDisplay();
        checkBackendConnection();
        return;
      }
    }
  } catch (err) {
    console.log('Modo de autenticación local activo.');
  }

  // Fallback demo login (admin / admin123)
  if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
    currentUser = { id: 1, username: 'admin', nombre_completo: 'Administrador Principal', rol: 'ADMINISTRADOR' };
    localStorage.setItem('supermercado_user', JSON.stringify(currentUser));
    showScreen('dashboardScreen');
    updateUserProfileDisplay();
    checkBackendConnection();
  } else {
    alert('Usuario o contraseña incorrectos. Usa (admin / admin123).');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Iniciar Sesión';
}

function handleLogout() {
  localStorage.removeItem('supermercado_user');
  localStorage.removeItem('supermercado_token');
  currentUser = null;
  showScreen('loginScreen');
}

function updateUserProfileDisplay() {
  if (!currentUser) return;
  document.getElementById('userName').textContent = currentUser.nombre_completo || currentUser.username;
  document.getElementById('userRole').textContent = currentUser.rol || 'ADMINISTRADOR';
  document.getElementById('userAvatar').textContent = (currentUser.nombre_completo || currentUser.username).charAt(0).toUpperCase();
}

async function checkBackendConnection() {
  try {
    const res = await fetch('http://localhost:8000/', { method: 'GET' });
    if (res.ok) {
      isLiveBackend = true;
      document.getElementById('apiStatusBadge').style.borderColor = 'rgba(16, 185, 129, 0.3)';
      document.getElementById('apiStatusText').textContent = 'Base de Datos Supabase (En línea)';
      refreshAllDataFromBackend();
      return;
    }
  } catch (err) {
    console.log('Modo Vista Previa Local activo.');
  }

  isLiveBackend = false;
  document.getElementById('apiStatusBadge').style.borderColor = 'rgba(245, 158, 11, 0.4)';
  document.getElementById('apiStatusText').textContent = 'Modo Vista Previa (Conecta tu backend Python en port 8000)';
  renderAllModulesLocal();
}

function setupEventListeners() {
  document.getElementById('m1SearchInput').addEventListener('input', renderModule1);
  document.getElementById('m1CategoryFilter').addEventListener('change', renderModule1);
  document.getElementById('m1StatusFilter').addEventListener('change', renderModule1);
  
  document.getElementById('m2SearchInput').addEventListener('input', renderModule2);
  document.getElementById('m3SearchInput').addEventListener('input', renderModule3);
  document.getElementById('m4SearchInput').addEventListener('input', renderModule4);
  document.getElementById('m7SearchInput').addEventListener('input', renderModule7);
}

function setProductPillFilter(val, btn) {
  document.querySelectorAll('.filter-pill-bar .filter-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const sel = document.getElementById('m1StatusFilter');
  if (sel) {
    sel.value = val;
    renderModule1();
  }
}


// Metadatos profesionales de cada sección
const moduleTitles = {
  'mod-productos': { title: 'Catálogo de Productos', subtitle: 'Administración de artículos, existencias, precios y categorías' },
  'mod-categorias': { title: 'Categorías de Productos', subtitle: 'Clasificación y familias organizadas de productos' },
  'mod-clientes': { title: 'Directorio de Clientes', subtitle: 'Control de compradores frecuentes y datos fiscales' },
  'mod-proveedores': { title: 'Gestión de Proveedores', subtitle: 'Red de distribuidores, empresas asociadas y contactos' },
  'mod-compras': { title: 'Recepción de Compras', subtitle: 'Registro de compras y aumento automático de existencias' },
  'mod-ventas': { title: 'Punto de Venta (POS)', subtitle: 'Facturación en mostrador y deducción en tiempo real de inventario' },
  'mod-inventario': { title: 'Control de Inventario', subtitle: 'Monitoreo de existencias, valorización y alertas de stock crítico' }
};

// Cambiar de Pestaña en la barra lateral
function switchModule(moduleId, btnElement) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.module-view').forEach(m => m.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');
  const modEl = document.getElementById(moduleId);
  if (modEl) modEl.classList.add('active');

  // Actualizar títulos del encabezado superior
  const meta = moduleTitles[moduleId];
  if (meta) {
    const mainTitle = document.getElementById('viewMainTitle');
    const subTitle = document.getElementById('viewSubTitle');
    if (mainTitle) mainTitle.textContent = meta.title;
    if (subTitle) subTitle.textContent = meta.subtitle;
  }

  // Renderizar la vista correspondiente
  if (moduleId === 'mod-productos') renderModule1();
  if (moduleId === 'mod-categorias') renderModule2();
  if (moduleId === 'mod-clientes') renderModule3();
  if (moduleId === 'mod-proveedores') renderModule4();
  if (moduleId === 'mod-compras') renderModule5();
  if (moduleId === 'mod-ventas') renderModule6();
  if (moduleId === 'mod-inventario') renderModule7();
}

// Cargar Datos del Backend
async function refreshAllDataFromBackend() {
  try {
    const [catRes, prodRes, cliRes, supRes, purRes, salRes] = await Promise.all([
      fetch(`${API_BASE_URL}/categorias`),
      fetch(`${API_BASE_URL}/productos`),
      fetch(`${API_BASE_URL}/clientes`),
      fetch(`${API_BASE_URL}/proveedores`),
      fetch(`${API_BASE_URL}/compras`),
      fetch(`${API_BASE_URL}/ventas`)
    ]);

    if (catRes.ok) localCategories = await catRes.json();
    if (prodRes.ok) localProducts = await prodRes.json();
    if (cliRes.ok) localClients = await cliRes.json();
    if (supRes.ok) localSuppliers = await supRes.json();
    if (purRes.ok) localPurchases = await purRes.json();
    if (salRes.ok) localSales = await salRes.json();

  } catch (err) {
    console.error('Error sincronizando con backend:', err);
  }

  renderAllModulesLocal();
}

function renderAllModulesLocal() {
  populateSelectDropdowns();
  renderModule1();
  renderModule2();
  renderModule3();
  renderModule4();
  renderModule5();
  renderModule6();
  renderModule7();
}

function populateSelectDropdowns() {
  // Módulo 1 Filtros y Modales
  const m1CatFilter = document.getElementById('m1CategoryFilter');
  const m1CatModal = document.getElementById('categoria_id');
  
  m1CatFilter.innerHTML = '<option value="">Todas las Categorías</option>';
  m1CatModal.innerHTML = '<option value="">Seleccione Categoría</option>';

  localCategories.forEach(c => {
    m1CatFilter.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    m1CatModal.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
  });

  // Módulo POS Ventas
  const posProdSelect = document.getElementById('posProductoSelect');
  posProdSelect.innerHTML = '<option value="">Seleccione un producto...</option>';
  localProducts.filter(p => p.estado === 'ACTIVO').forEach(p => {
    posProdSelect.innerHTML += `<option value="${p.id}">${p.nombre} (Stock: ${p.existencia}) - Q${parseFloat(p.precio_venta).toFixed(2)}</option>`;
  });

  const posCliSelect = document.getElementById('posClienteSelect');
  posCliSelect.innerHTML = '';
  localClients.forEach(c => {
    posCliSelect.innerHTML += `<option value="${c.id}">${c.nombres} ${c.apellidos} (NIT: ${c.nit})</option>`;
  });

  // Módulo Compras
  const purProvSelect = document.getElementById('purProveedorSelect');
  purProvSelect.innerHTML = '<option value="">Seleccione un proveedor...</option>';
  localSuppliers.forEach(s => {
    purProvSelect.innerHTML += `<option value="${s.id}">${s.nombre_proveedor} (NIT: ${s.nit || 'S/N'})</option>`;
  });

  const purProdSelect = document.getElementById('purProductoSelect');
  purProdSelect.innerHTML = '<option value="">Seleccione producto a comprar...</option>';
  localProducts.forEach(p => {
    purProdSelect.innerHTML += `<option value="${p.id}">${p.nombre} (P. Compra actual: Q${parseFloat(p.precio_compra).toFixed(2)})</option>`;
  });
}

// ==========================================
// RENDERIZADO MÓDULO 1: PRODUCTOS
// ==========================================
function renderModule1() {
  const searchVal = document.getElementById('m1SearchInput').value.toLowerCase().trim();
  const catVal = document.getElementById('m1CategoryFilter').value;
  const statusVal = document.getElementById('m1StatusFilter').value;

  const filtered = localProducts.filter(p => {
    const matchSearch = !searchVal || p.codigo.toLowerCase().includes(searchVal) || p.nombre.toLowerCase().includes(searchVal) || (p.descripcion && p.descripcion.toLowerCase().includes(searchVal));
    const matchCat = !catVal || p.categoria_id == catVal;
    let matchStatus = true;
    if (statusVal === 'ACTIVO') matchStatus = p.estado === 'ACTIVO';
    if (statusVal === 'INACTIVO') matchStatus = p.estado === 'INACTIVO';
    if (statusVal === 'CRITICO') matchStatus = p.existencia <= p.stock_minimo && p.estado === 'ACTIVO';
    return matchSearch && matchCat && matchStatus;
  });

  const tbody = document.getElementById('m1TableBody');
  tbody.innerHTML = '';

  let totalCount = localProducts.length;
  let activosCount = localProducts.filter(p => p.estado === 'ACTIVO').length;
  let criticoCount = localProducts.filter(p => p.existencia <= p.stock_minimo && p.estado === 'ACTIVO').length;

  document.getElementById('m1TotalProd').textContent = totalCount;
  document.getElementById('m1ActivosProd').textContent = activosCount;
  document.getElementById('m1CriticoProd').textContent = criticoCount;
  document.getElementById('m1TotalCat').textContent = localCategories.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 30px;">No se encontraron productos.</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const isCritical = p.existencia <= p.stock_minimo && p.estado === 'ACTIVO';
    const catName = p.categoria ? p.categoria.nombre : (localCategories.find(c => c.id == p.categoria_id)?.nombre || 'Sin Categoría');

    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.onclick = (e) => {
      if (e.target.closest('button')) return;
      const isAlready = tr.classList.contains('row-selected');
      document.querySelectorAll('#m1TableBody tr').forEach(r => r.classList.remove('row-selected'));
      if (!isAlready) tr.classList.add('row-selected');
    };
    tr.innerHTML = `
      <td><span class="code-pill">${escapeHtml(p.codigo)}</span></td>
      <td><strong>${escapeHtml(p.nombre)}</strong></td>
      <td>${escapeHtml(catName)}</td>
      <td>Q${parseFloat(p.precio_compra).toFixed(2)}</td>
      <td><strong>Q${parseFloat(p.precio_venta).toFixed(2)}</strong></td>
      <td><span style="font-weight: 700; color: ${isCritical ? 'var(--accent-red)' : 'inherit'}">${p.existencia}</span></td>
      <td>${p.stock_minimo}</td>
      <td>
        ${
          p.estado === 'INACTIVO'
            ? '<span class="badge badge-inactive">INACTIVO</span>'
            : isCritical
            ? '<span class="badge badge-critical">⚠️ CRÍTICO</span>'
            : '<span class="badge badge-active">ACTIVO</span>'
        }
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-sm btn-secondary" onclick="editProduct(${p.id})">✏️ Editar</button>
          ${
            p.estado === 'ACTIVO'
              ? `<button class="btn btn-sm btn-danger" onclick="toggleProductState(${p.id}, 'desactivar')">⛔ Desactivar</button>`
              : `<button class="btn btn-sm btn-success" onclick="toggleProductState(${p.id}, 'activar')">✅ Activar</button>`
          }
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// RENDERIZADO MÓDULO 2: CATEGORÍAS
// ==========================================
function renderModule2() {
  const searchVal = document.getElementById('m2SearchInput').value.toLowerCase().trim();
  const filtered = localCategories.filter(c => !searchVal || c.nombre.toLowerCase().includes(searchVal) || (c.descripcion && c.descripcion.toLowerCase().includes(searchVal)));

  const tbody = document.getElementById('m2TableBody');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">No se encontraron categorías.</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">${escapeHtml(c.codigo || `CAT-${c.id}`)}</span></td>
      <td><strong>${escapeHtml(c.nombre)}</strong></td>
      <td>${escapeHtml(c.descripcion || 'Sin descripción')}</td>
      <td><span class="badge ${c.estado === 'INACTIVO' ? 'badge-inactive' : 'badge-active'}">${c.estado || 'ACTIVO'}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editCategory(${c.id})">✏️ Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// RENDERIZADO MÓDULO 3: CLIENTES
// ==========================================
function renderModule3() {
  const searchVal = document.getElementById('m3SearchInput').value.toLowerCase().trim();
  const filtered = localClients.filter(c => !searchVal || c.nombres.toLowerCase().includes(searchVal) || c.apellidos.toLowerCase().includes(searchVal) || (c.nit && c.nit.toLowerCase().includes(searchVal)));

  const tbody = document.getElementById('m3TableBody');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No se encontraron clientes.</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">CLI-${c.id}</span></td>
      <td><strong>${escapeHtml(c.nombres)}</strong></td>
      <td>${escapeHtml(c.apellidos)}</td>
      <td><strong style="color: #38bdf8;">${escapeHtml(c.nit || 'CF')}</strong></td>
      <td>${escapeHtml(c.telefono || 'N/A')}</td>
      <td>${escapeHtml(c.correo || 'N/A')}</td>
      <td>${escapeHtml(c.direccion || 'N/A')}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editClient(${c.id})">✏️ Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// RENDERIZADO MÓDULO 4: PROVEEDORES
// ==========================================
function renderModule4() {
  const searchVal = document.getElementById('m4SearchInput').value.toLowerCase().trim();
  const filtered = localSuppliers.filter(s => !searchVal || s.nombre_proveedor.toLowerCase().includes(searchVal) || (s.nit && s.nit.toLowerCase().includes(searchVal)));

  const tbody = document.getElementById('m4TableBody');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No se encontraron proveedores.</td></tr>`;
    return;
  }

  filtered.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">PRV-${s.id}</span></td>
      <td><strong>${escapeHtml(s.nombre_proveedor)}</strong></td>
      <td><strong style="color: #38bdf8;">${escapeHtml(s.nit || 'N/A')}</strong></td>
      <td>${escapeHtml(s.nombre_contacto || 'N/A')}</td>
      <td>${escapeHtml(s.telefono || 'N/A')}</td>
      <td>${escapeHtml(s.correo || 'N/A')}</td>
      <td>${escapeHtml(s.direccion || 'N/A')}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editSupplier(${s.id})">✏️ Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// RENDERIZADO MÓDULO 5: COMPRAS
// ==========================================
function renderModule5() {
  const tbody = document.getElementById('m5TableBody');
  tbody.innerHTML = '';

  if (localPurchases.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">No hay compras registradas.</td></tr>`;
    return;
  }

  localPurchases.forEach(p => {
    const provName = p.proveedor ? p.proveedor.nombre_proveedor : (localSuppliers.find(s => s.id == p.proveedor_id)?.nombre_proveedor || 'Proveedor Desconocido');
    const userName = p.usuario ? p.usuario.nombre_completo : 'Administrador';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">${escapeHtml(p.numero_compra)}</span></td>
      <td><strong>${escapeHtml(provName)}</strong></td>
      <td>${new Date(p.fecha || Date.now()).toLocaleString()}</td>
      <td>${escapeHtml(userName)}</td>
      <td><strong style="color: var(--accent-green);">Q${parseFloat(p.total).toFixed(2)}</strong></td>
      <td><span class="badge badge-active">${p.estado}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="viewPurchaseDetail(${p.id})">👁️ Ver Detalle</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// RENDERIZADO MÓDULO 6: VENTAS
// ==========================================
function renderModule6() {
  // Renderizar Historial de Ventas
  const tbody = document.getElementById('m6TableBody');
  tbody.innerHTML = '';

  if (localSales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">No hay ventas registradas.</td></tr>`;
    return;
  }

  localSales.forEach(v => {
    const cliObj = v.cliente || localClients.find(c => c.id == v.cliente_id);
    const cliName = cliObj ? `${cliObj.nombres} ${cliObj.apellidos}` : 'Cliente Consumidor Final';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">#${v.id} (${v.numero_venta})</span></td>
      <td><strong>${escapeHtml(cliName)}</strong></td>
      <td>${new Date(v.fecha || Date.now()).toLocaleString()}</td>
      <td>${escapeHtml(v.usuario ? v.usuario.nombre_completo : 'Administrador')}</td>
      <td><strong style="color: var(--accent-green);">Q${parseFloat(v.total).toFixed(2)}</strong></td>
      <td><span class="badge badge-active">${v.estado}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="showReceiptModal(${v.id})">🧾 Ver Recibo</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  renderPosCart();
}

function posProductSelected() {
  const prodId = document.getElementById('posProductoSelect').value;
  if (!prodId) return;
  const prod = localProducts.find(p => p.id == prodId);
  if (prod) {
    document.getElementById('posCantidadInput').max = prod.existencia;
  }
}

function addPosCartItem() {
  const prodId = parseInt(document.getElementById('posProductoSelect').value);
  const cant = parseInt(document.getElementById('posCantidadInput').value);

  if (!prodId) {
    alert('Por favor seleccione un producto.');
    return;
  }
  if (!cant || cant <= 0) {
    alert('Ingrese una cantidad válida mayor a 0.');
    return;
  }

  const prod = localProducts.find(p => p.id === prodId);
  if (!prod) return;

  // REGLA DE NEGOCIO OBLIGATORIA: Validación de inventario previa en UI
  const existingCartItem = posCart.find(i => i.producto_id === prodId);
  const requestedTotal = (existingCartItem ? existingCartItem.cantidad : 0) + cant;

  if (requestedTotal > prod.existencia) {
    alert(`⛔ ERROR DE INVENTARIO: No hay suficiente existencias para '${prod.nombre}'.\n\nStock Disponible: ${prod.existencia} unidades.\nSolicitado: ${requestedTotal} unidades.`);
    return;
  }

  if (existingCartItem) {
    existingCartItem.cantidad = requestedTotal;
    existingCartItem.subtotal = existingCartItem.cantidad * prod.precio_venta;
  } else {
    posCart.push({
      producto_id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio_venta,
      cantidad: cant,
      subtotal: cant * prod.precio_venta
    });
  }

  renderPosCart();
}

function removePosCartItem(index) {
  posCart.splice(index, 1);
  renderPosCart();
}

function renderPosCart() {
  const tbody = document.getElementById('posCartTableBody');
  tbody.innerHTML = '';

  let total = 0;
  if (posCart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">Agregue productos al carrito para realizar la venta.</td></tr>`;
    document.getElementById('posTotalAmount').textContent = 'Q0.00';
    return;
  }

  posCart.forEach((item, idx) => {
    total += item.subtotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(item.nombre)}</strong></td>
      <td>Q${parseFloat(item.precio).toFixed(2)}</td>
      <td>${item.cantidad}</td>
      <td><strong>Q${parseFloat(item.subtotal).toFixed(2)}</strong></td>
      <td><button class="btn btn-sm btn-danger" onclick="removePosCartItem(${idx})">❌</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('posTotalAmount').textContent = `Q${total.toFixed(2)}`;
}

async function processVenta() {
  if (posCart.length === 0) {
    alert('El carrito de venta está vacío.');
    return;
  }

  const clienteId = parseInt(document.getElementById('posClienteSelect').value);
  const ventaData = {
    cliente_id: clienteId,
    usuario_id: currentUser ? currentUser.id : 1,
    detalles: posCart.map(i => ({ producto_id: i.producto_id, cantidad: i.cantidad, precio: i.precio }))
  };

  if (isLiveBackend) {
    try {
      const res = await fetch(`${API_BASE_URL}/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });
      if (res.ok) {
        const newVenta = await res.json();
        posCart = [];
        await refreshAllDataFromBackend();
        showReceiptModal(newVenta.id);
        return;
      } else {
        const errData = await res.json();
        alert(`❌ REGLA DE NEGOCIO: ${errData.detail || 'No se pudo realizar la venta'}`);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Fallback Local con validación estricta de existencias
  for (let item of posCart) {
    const prod = localProducts.find(p => p.id === item.producto_id);
    if (!prod || prod.existencia < item.cantidad) {
      alert(`❌ REGLA DE NEGOCIO: No se puede realizar la venta. Stock insuficiente para '${item.nombre}'.`);
      return;
    }
  }

  // Descontar inventario localmente
  posCart.forEach(item => {
    const prod = localProducts.find(p => p.id === item.producto_id);
    if (prod) prod.existencia -= item.cantidad;
  });

  const totalVenta = posCart.reduce((sum, i) => sum + i.subtotal, 0);
  const newVentaId = localSales.length ? Math.max(...localSales.map(v => v.id)) + 1 : 1051;
  const newVentaObj = {
    id: newVentaId,
    numero_venta: `VTA-${newVentaId}`,
    cliente_id: clienteId,
    cliente: localClients.find(c => c.id === clienteId),
    usuario: { nombre_completo: 'Administrador' },
    fecha: new Date().toISOString(),
    total: totalVenta,
    estado: 'COMPLETADA',
    detalles: posCart.map((item, idx) => ({ id: idx + 1, producto_id: item.producto_id, producto: { nombre: item.nombre }, cantidad: item.cantidad, precio: item.precio, subtotal: item.subtotal }))
  };

  localSales.unshift(newVentaObj);
  posCart = [];
  renderAllModulesLocal();
  showReceiptModal(newVentaId);
}

function showReceiptModal(ventaId) {
  const v = localSales.find(sale => sale.id == ventaId);
  if (!v) return;

  const cliObj = v.cliente || localClients.find(c => c.id == v.cliente_id);
  const container = document.getElementById('receiptContent');

  let detailsHtml = '';
  v.detalles.forEach(d => {
    const prodName = d.producto ? d.producto.nombre : (localProducts.find(p => p.id == d.producto_id)?.nombre || 'Producto');
    detailsHtml += `
      <tr>
        <td>${escapeHtml(prodName)}</td>
        <td style="text-align: center;">${d.cantidad}</td>
        <td style="text-align: right;">Q${parseFloat(d.precio).toFixed(2)}</td>
        <td style="text-align: right;">Q${parseFloat(d.subtotal).toFixed(2)}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="receipt-card">
      <div class="receipt-header">
        <h3 style="font-size: 1.1rem; font-weight: 700;">SUPERMERCADO CONTROL PRO</h3>
        <p style="font-size: 0.8rem; color: #4b5563;">Venta #${v.id} (${v.numero_venta})</p>
        <p style="font-size: 0.78rem; color: #4b5563;">Fecha: ${new Date(v.fecha || Date.now()).toLocaleString()}</p>
        <p style="font-size: 0.85rem; font-weight: 600; margin-top: 6px;">Cliente: ${escapeHtml(cliObj ? `${cliObj.nombres} ${cliObj.apellidos}` : 'Juan Pérez')} (NIT: ${escapeHtml(cliObj ? cliObj.nit : 'CF')})</p>
      </div>

      <table class="receipt-table">
        <thead>
          <tr style="border-bottom: 1px solid #111827;">
            <th>Producto</th>
            <th style="text-align: center;">Cant.</th>
            <th style="text-align: right;">Precio</th>
            <th style="text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${detailsHtml}
        </tbody>
      </table>

      <div style="border-top: 2px solid #111827; padding-top: 8px; text-align: right; font-size: 1.1rem; font-weight: 700;">
        Total: Q${parseFloat(v.total).toFixed(2)}
      </div>

      <div class="receipt-footer" style="margin-top: 16px;">
        <p>¡Gracias por su compra!</p>
        <p>Atendido por: ${escapeHtml(v.usuario ? v.usuario.nombre_completo : 'Administrador')}</p>
      </div>
    </div>
  `;

  openModal('receiptModal');
}

// ==========================================
// RENDERIZADO MÓDULO 7: INVENTARIO
// ==========================================
function renderModule7() {
  const searchVal = document.getElementById('m7SearchInput').value.toLowerCase().trim();
  const filtered = localProducts.filter(p => !searchVal || p.codigo.toLowerCase().includes(searchVal) || p.nombre.toLowerCase().includes(searchVal));

  const tbody = document.getElementById('m7TableBody');
  tbody.innerHTML = '';

  let valorTotal = 0;
  let unidadesTotales = 0;
  let bajoStock = 0;
  let agotados = 0;

  localProducts.forEach(p => {
    valorTotal += (p.existencia * p.precio_compra);
    unidadesTotales += p.existencia;
    if (p.existencia === 0) agotados++;
    else if (p.existencia <= p.stock_minimo) bajoStock++;
  });

  document.getElementById('m7ValorInventario').textContent = `Q${valorTotal.toFixed(2)}`;
  document.getElementById('m7TotalUnidades').textContent = unidadesTotales;
  document.getElementById('m7BajoStock').textContent = bajoStock;
  document.getElementById('m7Agotados').textContent = agotados;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No hay productos en inventario.</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const catName = p.categoria ? p.categoria.nombre : (localCategories.find(c => c.id == p.categoria_id)?.nombre || 'Sin Categoría');
    let estadoInvHtml = '<span class="badge badge-active">SUFICIENTE</span>';
    if (p.existencia === 0) {
      estadoInvHtml = '<span class="badge badge-critical" style="background: rgba(239, 68, 68, 0.3);">AGOTADO</span>';
    } else if (p.existencia <= p.stock_minimo) {
      estadoInvHtml = '<span class="badge badge-critical">⚠️ STOCK BAJO</span>';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="code-pill">${escapeHtml(p.codigo)}</span></td>
      <td><strong>${escapeHtml(p.nombre)}</strong></td>
      <td>${escapeHtml(catName)}</td>
      <td>Q${parseFloat(p.precio_compra).toFixed(2)}</td>
      <td>Q${parseFloat(p.precio_venta).toFixed(2)}</td>
      <td><strong style="font-size: 1rem; color: ${p.existencia <= p.stock_minimo ? 'var(--accent-red)' : 'inherit'}">${p.existencia}</strong></td>
      <td>${p.stock_minimo}</td>
      <td>${estadoInvHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// ACCIONES Y MODALES (PRODUCTO, CATEGORÍA, CLIENTE, PROVEEDOR, COMPRA)
// ==========================================
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Módulo 1: Guardar Producto
function openProductModal() {
  document.getElementById('modalTitle').textContent = 'Nuevo Producto';
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('estado').value = 'ACTIVO';
  openModal('productModal');
}

function editProduct(id) {
  const prod = localProducts.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('modalTitle').textContent = 'Editar Producto';
  document.getElementById('productId').value = prod.id;
  document.getElementById('codigo').value = prod.codigo;
  document.getElementById('nombre').value = prod.nombre;
  document.getElementById('descripcion').value = prod.descripcion || '';
  document.getElementById('categoria_id').value = prod.categoria_id || '';
  document.getElementById('precio_compra').value = prod.precio_compra;
  document.getElementById('precio_venta').value = prod.precio_venta;
  document.getElementById('existencia').value = prod.existencia;
  document.getElementById('stock_minimo').value = prod.stock_minimo;
  document.getElementById('estado').value = prod.estado;

  openModal('productModal');
}

async function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('productId').value;
  const productData = {
    codigo: document.getElementById('codigo').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    categoria_id: parseInt(document.getElementById('categoria_id').value),
    precio_compra: parseFloat(document.getElementById('precio_compra').value),
    precio_venta: parseFloat(document.getElementById('precio_venta').value),
    existencia: parseInt(document.getElementById('existencia').value),
    stock_minimo: parseInt(document.getElementById('stock_minimo').value),
    estado: document.getElementById('estado').value
  };

  if (isLiveBackend) {
    try {
      const url = id ? `${API_BASE_URL}/productos/${id}` : `${API_BASE_URL}/productos`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) });
      if (res.ok) {
        closeModal('productModal');
        await refreshAllDataFromBackend();
        return;
      }
    } catch (err) { console.error(err); }
  }

  if (id) {
    const idx = localProducts.findIndex(p => p.id == id);
    if (idx !== -1) localProducts[idx] = { ...localProducts[idx], ...productData };
  } else {
    const newId = localProducts.length ? Math.max(...localProducts.map(p => p.id)) + 1 : 1;
    localProducts.unshift({ id: newId, ...productData });
  }

  closeModal('productModal');
  renderAllModulesLocal();
}

async function toggleProductState(id, action) {
  if (isLiveBackend) {
    try {
      const res = await fetch(`${API_BASE_URL}/productos/${id}/${action}`, { method: 'PATCH' });
      if (res.ok) { await refreshAllDataFromBackend(); return; }
    } catch (err) { console.error(err); }
  }

  const prod = localProducts.find(p => p.id === id);
  if (prod) {
    prod.estado = action === 'desactivar' ? 'INACTIVO' : 'ACTIVO';
    renderAllModulesLocal();
  }
}

// Módulo 2: Categorías
function openCategoryModal() {
  document.getElementById('catModalTitle').textContent = 'Nueva Categoría';
  document.getElementById('categoryForm').reset();
  document.getElementById('categoryId').value = '';
  openModal('categoryModal');
}

function editCategory(id) {
  const cat = localCategories.find(c => c.id === id);
  if (!cat) return;
  document.getElementById('catModalTitle').textContent = 'Editar Categoría';
  document.getElementById('categoryId').value = cat.id;
  document.getElementById('catCodigo').value = cat.codigo || '';
  document.getElementById('catNombre').value = cat.nombre;
  document.getElementById('catDescripcion').value = cat.descripcion || '';
  openModal('categoryModal');
}

async function saveCategory(e) {
  e.preventDefault();
  const id = document.getElementById('categoryId').value;
  const data = {
    codigo: document.getElementById('catCodigo').value.trim() || `CAT-${localCategories.length + 1}`,
    nombre: document.getElementById('catNombre').value.trim(),
    descripcion: document.getElementById('catDescripcion').value.trim(),
    estado: 'ACTIVO'
  };

  if (isLiveBackend) {
    try {
      const url = id ? `${API_BASE_URL}/categorias/${id}` : `${API_BASE_URL}/categorias`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { closeModal('categoryModal'); await refreshAllDataFromBackend(); return; }
    } catch (err) { console.error(err); }
  }

  if (id) {
    const idx = localCategories.findIndex(c => c.id == id);
    if (idx !== -1) localCategories[idx] = { ...localCategories[idx], ...data };
  } else {
    const newId = localCategories.length ? Math.max(...localCategories.map(c => c.id)) + 1 : 1;
    localCategories.push({ id: newId, ...data });
  }

  closeModal('categoryModal');
  renderAllModulesLocal();
}

// Módulo 3: Clientes
function openClientModal() {
  document.getElementById('clientModalTitle').textContent = 'Nuevo Cliente';
  document.getElementById('clientForm').reset();
  document.getElementById('clientId').value = '';
  openModal('clientModal');
}

function editClient(id) {
  const cli = localClients.find(c => c.id === id);
  if (!cli) return;
  document.getElementById('clientModalTitle').textContent = 'Editar Cliente';
  document.getElementById('clientId').value = cli.id;
  document.getElementById('cliNombres').value = cli.nombres;
  document.getElementById('cliApellidos').value = cli.apellidos;
  document.getElementById('cliNit').value = cli.nit || 'CF';
  document.getElementById('cliTelefono').value = cli.telefono || '';
  document.getElementById('cliCorreo').value = cli.correo || '';
  document.getElementById('cliDireccion').value = cli.direccion || '';
  openModal('clientModal');
}

async function saveClient(e) {
  e.preventDefault();
  const id = document.getElementById('clientId').value;
  const data = {
    nombres: document.getElementById('cliNombres').value.trim(),
    apellidos: document.getElementById('cliApellidos').value.trim(),
    nit: document.getElementById('cliNit').value.trim() || 'CF',
    telefono: document.getElementById('cliTelefono').value.trim(),
    correo: document.getElementById('cliCorreo').value.trim(),
    direccion: document.getElementById('cliDireccion').value.trim(),
    estado: 'ACTIVO'
  };

  if (isLiveBackend) {
    try {
      const url = id ? `${API_BASE_URL}/clientes/${id}` : `${API_BASE_URL}/clientes`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { closeModal('clientModal'); await refreshAllDataFromBackend(); return; }
    } catch (err) { console.error(err); }
  }

  if (id) {
    const idx = localClients.findIndex(c => c.id == id);
    if (idx !== -1) localClients[idx] = { ...localClients[idx], ...data };
  } else {
    const newId = localClients.length ? Math.max(...localClients.map(c => c.id)) + 1 : 1;
    localClients.push({ id: newId, ...data });
  }

  closeModal('clientModal');
  renderAllModulesLocal();
}

// Módulo 4: Proveedores
function openSupplierModal() {
  document.getElementById('supplierModalTitle').textContent = 'Nuevo Proveedor';
  document.getElementById('supplierForm').reset();
  document.getElementById('supplierId').value = '';
  openModal('supplierModal');
}

function editSupplier(id) {
  const sup = localSuppliers.find(s => s.id === id);
  if (!sup) return;
  document.getElementById('supplierModalTitle').textContent = 'Editar Proveedor';
  document.getElementById('supplierId').value = sup.id;
  document.getElementById('supNombre').value = sup.nombre_proveedor;
  document.getElementById('supNit').value = sup.nit || '';
  document.getElementById('supContacto').value = sup.nombre_contacto || '';
  document.getElementById('supTelefono').value = sup.telefono || '';
  document.getElementById('supCorreo').value = sup.correo || '';
  document.getElementById('supDireccion').value = sup.direccion || '';
  openModal('supplierModal');
}

async function saveSupplier(e) {
  e.preventDefault();
  const id = document.getElementById('supplierId').value;
  const data = {
    nombre_proveedor: document.getElementById('supNombre').value.trim(),
    nit: document.getElementById('supNit').value.trim(),
    nombre_contacto: document.getElementById('supContacto').value.trim(),
    telefono: document.getElementById('supTelefono').value.trim(),
    correo: document.getElementById('supCorreo').value.trim(),
    direccion: document.getElementById('supDireccion').value.trim(),
    estado: 'ACTIVO'
  };

  if (isLiveBackend) {
    try {
      const url = id ? `${API_BASE_URL}/proveedores/${id}` : `${API_BASE_URL}/proveedores`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { closeModal('supplierModal'); await refreshAllDataFromBackend(); return; }
    } catch (err) { console.error(err); }
  }

  if (id) {
    const idx = localSuppliers.findIndex(s => s.id == id);
    if (idx !== -1) localSuppliers[idx] = { ...localSuppliers[idx], ...data };
  } else {
    const newId = localSuppliers.length ? Math.max(...localSuppliers.map(s => s.id)) + 1 : 1;
    localSuppliers.push({ id: newId, ...data });
  }

  closeModal('supplierModal');
  renderAllModulesLocal();
}

// Módulo 5: Compras (Modal y lógica)
function openPurchaseModal() {
  purchaseCartItems = [];
  renderPurchaseItemsTable();
  const selectProd = document.getElementById('purProductoSelect');
  if (selectProd && selectProd.options.length > 0) {
    if (selectProd.options[0].value) {
      selectProd.selectedIndex = 0;
    }
    purProductSelected();
  }
  openModal('purchaseModal');
}

function purProductSelected() {
  const prodId = parseInt(document.getElementById('purProductoSelect').value);
  if (!prodId) {
    document.getElementById('purPrecioInput').value = '';
    return;
  }
  const prod = localProducts.find(p => p.id === prodId);
  if (prod) {
    document.getElementById('purPrecioInput').value = prod.precio_compra;
  }
}

function addPurchaseItem() {
  const prodId = parseInt(document.getElementById('purProductoSelect').value);
  const cant = parseInt(document.getElementById('purCantidadInput').value);
  const precio = parseFloat(document.getElementById('purPrecioInput').value);

  if (!prodId) {
    alert('Por favor seleccione un producto a comprar.');
    return;
  }
  if (!cant || cant <= 0) {
    alert('Ingrese una cantidad válida mayor a 0.');
    return;
  }
  if (isNaN(precio) || precio < 0) {
    alert('Ingrese un precio de compra válido.');
    return;
  }

  const prod = localProducts.find(p => p.id === prodId);
  
  // Si ya existe el producto en la lista, actualizar cantidad
  const existingItem = purchaseCartItems.find(i => i.producto_id === prodId);
  if (existingItem) {
    existingItem.cantidad += cant;
    existingItem.precio_compra = precio;
    existingItem.subtotal = existingItem.cantidad * precio;
  } else {
    purchaseCartItems.push({
      producto_id: prodId,
      nombre: prod ? prod.nombre : 'Producto',
      cantidad: cant,
      precio_compra: precio,
      subtotal: cant * precio
    });
  }

  renderPurchaseItemsTable();
}

function renderPurchaseItemsTable() {
  const tbody = document.getElementById('purchaseItemsTableBody');
  tbody.innerHTML = '';
  let total = 0;

  if (purchaseCartItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Sin productos agregados</td></tr>`;
    document.getElementById('purTotalAmount').textContent = '0.00';
    return;
  }

  purchaseCartItems.forEach((item, idx) => {
    total += item.subtotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(item.nombre)}</td>
      <td>${item.cantidad}</td>
      <td>Q${parseFloat(item.precio_compra).toFixed(2)}</td>
      <td>Q${parseFloat(item.subtotal).toFixed(2)}</td>
      <td><button type="button" class="btn btn-sm btn-danger" onclick="purchaseCartItems.splice(${idx},1); renderPurchaseItemsTable();">❌</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('purTotalAmount').textContent = total.toFixed(2);
}

async function savePurchase(e) {
  e.preventDefault();
  const provId = parseInt(document.getElementById('purProveedorSelect').value);

  // Si no hay productos en la tabla, pero los campos de producto y cantidad están llenos, agregarlo automáticamente
  if (purchaseCartItems.length === 0) {
    const prodId = parseInt(document.getElementById('purProductoSelect').value);
    const cant = parseInt(document.getElementById('purCantidadInput').value);
    const precio = parseFloat(document.getElementById('purPrecioInput').value);
    if (prodId && cant > 0 && !isNaN(precio)) {
      addPurchaseItem();
    }
  }

  if (!provId) {
    alert('Por favor seleccione un proveedor.');
    return;
  }

  if (purchaseCartItems.length === 0) {
    alert('Debe agregar al menos un producto a la lista de compra haciendo clic en el botón "➕ Agregar".');
    return;
  }

  const compraData = {
    proveedor_id: provId,
    usuario_id: currentUser ? currentUser.id : 1,
    detalles: purchaseCartItems.map(i => ({ producto_id: i.producto_id, cantidad: i.cantidad, precio_compra: i.precio_compra }))
  };

  if (isLiveBackend) {
    try {
      const res = await fetch(`${API_BASE_URL}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compraData)
      });
      if (res.ok) {
        closeModal('purchaseModal');
        await refreshAllDataFromBackend();
        return;
      } else {
        const errData = await res.json();
        alert(`❌ ERROR EN BASE DE DATOS: ${errData.detail || 'No se pudo registrar la compra.'}`);
        return;
      }
    } catch (err) {
      console.error(err);
      alert('Error al comunicar con la API backend.');
      return;
    }
  }

  // Fallback local: Incrementar inventario (+ Cantidad)
  purchaseCartItems.forEach(item => {
    const prod = localProducts.find(p => p.id === item.producto_id);
    if (prod) {
      prod.existencia += item.cantidad;
      prod.precio_compra = item.precio_compra;
    }
  });

  const totalCompra = purchaseCartItems.reduce((sum, i) => sum + i.subtotal, 0);
  const newId = localPurchases.length ? Math.max(...localPurchases.map(p => p.id)) + 1 : 1;
  localPurchases.unshift({
    id: newId,
    numero_compra: `CMP-2026-${newId.toString().padStart(3, '0')}`,
    proveedor_id: provId,
