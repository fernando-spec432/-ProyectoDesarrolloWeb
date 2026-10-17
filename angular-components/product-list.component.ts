import { Component, OnInit } from '@angular/core';
import { SupermercadoService, Producto, Categoria } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  
  searchTerm: string = '';
  selectedCategoriaId?: number;
  selectedEstado: string = '';

  constructor(private supermercadoService: SupermercadoService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias(): void {
    this.supermercadoService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  cargarProductos(): void {
    this.supermercadoService.getProductos(this.searchTerm, this.selectedCategoriaId, this.selectedEstado).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  onBuscar(): void {
    this.cargarProductos();
  }

  desactivar(id: number): void {
    if (confirm('¿Desea desactivar este producto?')) {
      this.supermercadoService.desactivarProducto(id).subscribe(() => this.cargarProductos());
    }
  }

  activar(id: number): void {
    this.supermercadoService.activarProducto(id).subscribe(() => this.cargarProductos());
  }
}
