import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  datos: any[] = []; // Propiedad para almacenar los datos de la API

  constructor() {}

  async callApi() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes'); // Asegúrate de reemplazar la URL
      this.datos = response.data; // Almacena la respuesta en la propiedad datos
      console.log(this.datos);
    } catch (error) {
      console.error('Error calling API: ', error);
    }
  }
}
