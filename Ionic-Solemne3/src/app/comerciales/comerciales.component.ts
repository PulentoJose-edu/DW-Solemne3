import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { VentasServiceService } from '../ventas-service.service'; // Import the service

@Component({
  selector: 'app-comerciales',
  templateUrl: './comerciales.component.html',
  styleUrls: ['./comerciales.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ComercialesComponent {
  comerciales: any[] = [];
  errorMessage: string = '';

  constructor(
    private location: Location,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  // Método para obtener los comerciales desde la API
  async fetchComerciales() {
    try {
      const response = await this.ventasService.fetchComerciales();
      this.comerciales = response;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error: unknown) {
      this.errorMessage = 'Error al obtener los comerciales. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

  goBack() {
    this.location.back();
  }
}
