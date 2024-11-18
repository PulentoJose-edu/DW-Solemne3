import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { VentasServiceService } from '../ventas-service.service'; // Import the service

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PedidosComponent {
  pedidos: any[] = [];
  errorMessage: string = '';

  constructor(
    private location: Location,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  // Método para obtener los pedidos desde la API al presionar el botón
  async fetchPedidos() {
    try {
      const response = await this.ventasService.fetchPedidos();
      this.pedidos = response;
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
