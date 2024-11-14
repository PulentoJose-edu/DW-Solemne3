import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-generar-pedido',
  standalone: true,
  templateUrl: './generar-pedido.component.html',
  styleUrls: ['./generar-pedido.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GenerarPedidoComponent {
  pedido = {
    total: '',
    fecha: new Date().toISOString().slice(0, 10), // Formato YYYY-MM-DD
    cliente: '',
    comercial: '',
  };
  correoElectronico: string = ''; // Nueva propiedad para el correo electrónico
  errorMessage: string = '';

  constructor(private location: Location, private alertController: AlertController) {}

  async crearPedido(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', {
        ...this.pedido,
        correoElectronico: this.correoElectronico // Añade el correo en la solicitud
      });
      console.log('Pedido creado exitosamente:', response.data);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Pedido creado exitosamente. Se ha enviado un comprobante al correo.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al crear el pedido',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goBack() {
    this.location.back();
  }
}

