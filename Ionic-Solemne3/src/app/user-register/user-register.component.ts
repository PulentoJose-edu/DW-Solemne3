import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location
import { VentasServiceService } from '../ventas-service.service'; // Import the service

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserRegisterComponent {
  user = {
    nombre: '',
    apellido1: '',
    comision: '',
    password: '',
  };

  errorMessage: string = '';  // Define errorMessage como una propiedad de tipo string

  constructor(
    private location: Location,
    private ventasService: VentasServiceService, // Inject the service
    private alertController: AlertController // Inject AlertController
  ) {}

  async registerUser(event: Event) {
    event.preventDefault();
    try {
      const response = await this.ventasService.registerUser(this.user);
      console.log('Registro exitoso:', response);
      this.showAlert('Usuario registrado exitosamente');
    } catch (error: unknown) {
      console.error('Error en el registro:', error);
      this.showAlert('Hubo un problema en el registro');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goBack() {
    this.location.back(); // Regresar a la vista anterior
  }

}
