import { Component, OnInit } from '@angular/core';
import { VentasServiceService } from '../ventas-service.service';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductosComponent  {
  productos: any[] = [];
  errorMessage: string = '';

  constructor(
    private location: Location,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  // Método para obtener los pedidos desde la API al presionar el botón
  async fetchProductos() {
    try {
      const response = await this.ventasService.fetchProductos();
      this.productos = response;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error: unknown) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

  goBack() {
    this.location.back();
  }
}
