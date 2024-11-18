import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasServiceService } from '../ventas-service.service'; // Import the service
import { AxiosError } from 'axios';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WelcomeComponent {
  username: string = '';
  password: string = '';
  idComercial: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  // Method to make login request to the backend API using the service
  async login() {
    try {
      const loginResponse = await this.ventasService.login(this.username, this.password);
      const idComercialResponse = await this.ventasService.getComercialId(this.username, this.password);

      // Check if login was successful
      if (loginResponse.success) {
        this.idComercial = idComercialResponse.id;
        console.log(this.idComercial);
        this.router.navigate(['/intermediate', this.idComercial]); // Navigate to intermediate component on success
      } else {
        this.showAlert('Credenciales incorrectas. Inténtalo nuevamente.');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Handle error responses
      if (axiosError.response) {
        // Specific error handling based on response status
        if (axiosError.response.status === 401) {
          this.showAlert('Credenciales incorrectas. Inténtalo nuevamente.');
        } else if (axiosError.response.status === 404) {
          this.showAlert('Usuario no encontrado.');
        } else {
          this.showAlert('Error en la autenticación. Inténtalo nuevamente.');
        }
      } else {
        this.showAlert('Error de conexión con el servidor.');
      }
    }
  }

  // Method to show an alert
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToUserRegister() {
    this.router.navigate(['/user-register']); // Navega a la página de registro
  }
}