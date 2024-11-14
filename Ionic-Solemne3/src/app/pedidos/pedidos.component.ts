import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import axios from 'axios';

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

  constructor() {}

  // Método para obtener los pedidos desde la API al presionar el botón
  async fetchPedidos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pedidos');
      this.pedidos = response.data;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }
}
