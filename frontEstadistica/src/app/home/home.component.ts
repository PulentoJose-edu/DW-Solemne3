import {  Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoProductoService } from '../pedido-producto.service';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { totalmem } from 'node:os';

Chart.register(...registerables);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  // Modelo del formulario para un nuevo producto
  productos = {
    nombre: '',
    precio: '',
    cantidad_disponible: '',
  };
  
  productosVendidos: any[]= [];

  chartPie: any;

  // Propiedad para manejar mensajes de error
  errorMessage: string = '';

  // Lista de productos (podrías cambiar `any` por un tipo definido si usas interfaces o clases)
  listProducto: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pedidosProductosService: PedidoProductoService // Inyección del servicio
  ) {}

  
  async crearProducto(event: Event) {
    event.preventDefault();
    

    // Validación básica del formulario
    if (!this.productos.nombre || !this.productos.precio || !this.productos.cantidad_disponible) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }
    
    try {
      // Enviar datos al servicio para crear un nuevo producto
      const response = await this.pedidosProductosService.crearProducto(this.productos);
      console.log('Producto creado exitosamente:', response);
      
      // Reiniciar el formulario después de crear el producto
      this.productos = {
        nombre: '',
        precio: '',
        cantidad_disponible: '',
      };

      // Agregar el nuevo producto a la lista local
      this.listProducto.push(response);
      // Limpiar mensajes de error
      this.errorMessage = '';
      
    } catch (error) {
      console.error('Error al crear el producto:', error);
      this.errorMessage = 'Hubo un error al crear el producto. Inténtalo nuevamente.';
    }
  }
  async fetchProductos() {
    try {
      const response = await this.pedidosProductosService.fetchProductos();
      this.listProducto = response;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error: unknown) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

  buttonGraficos() {
    this.router.navigate(['graficos']);
  }
  
  ngOnInit() {
    this.fetchProductos();
  }
}

