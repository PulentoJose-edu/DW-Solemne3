import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location
import { ActivatedRoute, Router } from '@angular/router';

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
    correoElectronico: ''
  };
  errorMessage: string = '';
  nombre: string = ''; 

  constructor(private location: Location, private alertController: AlertController, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.nombre = this.route.snapshot.paramMap.get('nombre') || ''; // Obtener el parámetro como string
    console.log(this.nombre); // Verificar el valor convertido
  }

  async crearPedido(event: Event) {
    event.preventDefault();
    try {
      // Convertir ambos valores a cadenas y normalizarlos
      const nombreNormalizado = this.nombre.toString().trim().toLowerCase();
      const comercialNormalizado = this.pedido.comercial.toString().trim().toLowerCase();
    
      // Verificar si los valores coinciden
      if (nombreNormalizado !== comercialNormalizado) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'El nombre no coincide con el comercial.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Salir del método si no coinciden
      }
    
      // Continuar con la creación del pedido si son iguales
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', this.pedido);
      console.log('Pedido creado exitosamente:', response.data);
    
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Pedido creado exitosamente. Se ha enviado un comprobante al correo.',
        buttons: ['OK']
      });
      await alert.present();
    
      // Enviar correo
      const responseEmail = await axios.post('http://127.0.0.1:8000/api/send-email/', this.pedido);
      console.log('Correo enviado exitosamente:', responseEmail.data);
    
    } catch (error) {
      console.error('Error al procesar el pedido o enviar el correo:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al procesar el pedido. Inténtelo nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goBack() {
    this.location.back();
  }

  comprobacionIdCliente(){
    this.pedido
  }

}

