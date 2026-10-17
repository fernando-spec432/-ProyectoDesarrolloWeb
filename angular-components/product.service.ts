import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- INTERFACES DE LOS 7 MÓDULOS ---
export interface Categoria {
  id?: number;
  codigo?: string;
  nombre: string;
  descripcion?: string;
  estado?: string;
}

export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  categoria_id?: number;
  precio_compra: number;
  precio_venta: number;
  existencia: number;
  stock_minimo: number;
  estado: 'ACTIVO' | 'INACTIVO';
  categoria?: Categoria;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Cliente {
  id?: number;
  nombres: string;
  apellidos: string;
  nit?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estado?: string;
}

export interface Proveedor {
  id?: number;
  nombre_proveedor: string;
  nit?: string;
  nombre_contacto?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estado?: string;
}

export interface DetalleCompraItem {
  producto_id: number;
  cantidad: number;
  precio_compra: number;
}

export interface Compra {
  id?: number;
  numero_compra?: string;
  proveedor_id: number;
  usuario_id?: number;
  total?: number;
  estado?: string;
  detalles: DetalleCompraItem[];
  proveedor?: Proveedor;
  fecha?: string;
}

export interface DetalleVentaItem {
  producto_id: number;
  cantidad: number;
  precio: number;
}

export interface Venta {
  id?: number;
  numero_venta?: string;
  cliente_id: number;
  usuario_id?: number;
  total?: number;
  estado?: string;
  detalles: DetalleVentaItem[];
  cliente?: Cliente;
  fecha?: string;
}

export interface InventarioItem {
  producto_id: number;
  codigo: string;
  producto_nombre: string;
  categoria_nombre?: string;
  precio_compra: number;
  precio_venta: number;
  existencia: number;
  stock_minimo: number;
  estado_producto: string;
  estado_inventario: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupermercadoService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // --- MÓDULO 1: PRODUCTOS ---
  getProductos(search?: string, categoriaId?: number, estado?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (categoriaId) params = params.set('categoria_id', categoriaId.toString());
    if (estado) params = params.set('estado', estado);
    return this.http.get<Producto[]>(`${this.baseUrl}/productos`, { params });
  }

  registrarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/productos`, producto);
  }

  modificarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/productos/${id}`, producto);
  }

  desactivarProducto(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.baseUrl}/productos/${id}/desactivar`, {});
  }

  activarProducto(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.baseUrl}/productos/${id}/activar`, {});
  }

  // --- MÓDULO 2: CATEGORÍAS ---
  getCategorias(search?: string): Observable<Categoria[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`, { params });
  }

  registrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categorias`, categoria);
  }

  // --- MÓDULO 3: CLIENTES ---
  getClientes(search?: string): Observable<Cliente[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`, { params });
  }

  registrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }

  editarCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/clientes/${id}`, cliente);
  }

  // --- MÓDULO 4: PROVEEDORES ---
  getProveedores(search?: string): Observable<Proveedor[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Proveedor[]>(`${this.baseUrl}/proveedores`, { params });
  }

  registrarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.baseUrl}/proveedores`, proveedor);
  }

  // --- MÓDULO 5: COMPRAS ---
  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.baseUrl}/compras`);
  }

  registrarCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(`${this.baseUrl}/compras`, compra);
  }

  // --- MÓDULO 6: VENTAS (Con validación de stock) ---
  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.baseUrl}/ventas`);
  }

  registrarVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.baseUrl}/ventas`, venta);
  }

  // --- MÓDULO 7: INVENTARIO ---
  getInventario(): Observable<InventarioItem[]> {
    return this.http.get<InventarioItem[]>(`${this.baseUrl}/inventario`);
  }
}
