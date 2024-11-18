import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { VentasServiceService } from '../ventas-service.service'; // Import the service

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  datos: any[] = []; // Propiedad para almacenar los datos de la API

  constructor(
    private location: Location,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  async callApi() {
    try {
      const response = await this.ventasService.fetchClientes(); // Use the service method
      this.datos = response; // Almacena la respuesta en la propiedad datos
      console.log(this.datos);
    } catch (error: unknown) {
      console.error('Error calling API: ', error);
    }
  }

  goBack() {
    this.location.back();
  }
}
