import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios, { AxiosError } from 'axios';

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
  errorMessage: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  // Method to make login request to the backend API using Axios
  async login() {
    try {
      const loginData = {
        nombre: this.username,
        password: this.password
      };

      // Send a POST request to the backend API with Axios
      const response = await axios.post('http://127.0.0.1:8000/api/comercial/login/', loginData);

     
      // Check if login was successful
      if (response.data.success) {
        //this.router.navigate(['/intermediate']);  
        
        this.router.navigate(['/intermediate', this.username]); // Navigate to intermediate component on success

      } else {
        this.showAlert('Credenciales incorrectas. Inténtalo nuevamente.');
      }
    } catch (error: unknown) {
      // Cast error as AxiosError if it's an instance of AxiosError
      const axiosError = error as AxiosError;

        console.log(axiosError.response)
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
