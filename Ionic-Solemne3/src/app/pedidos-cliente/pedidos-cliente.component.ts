import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PedidosClienteComponent {
  pedidos: any[] = []; // Aquí se almacenarán los pedidos filtrados
  errorMessage: string = '';
  nombre: number = 0; // Ahora es de tipo número
  
  constructor(private location: Location, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const nombreParam = this.route.snapshot.paramMap.get('nombre') || '0'; // Obtener el parámetro como string
    this.nombre = Number(nombreParam); // Convertir a número
    console.log(this.nombre); // Verificar el valor convertido
  }

  // Método para obtener los pedidos desde la API
  async fetchPedidos() {
    try {
      

      const response = await axios.get('http://127.0.0.1:8000/api/pedidos');
      this.pedidos = response.data
        .filter((pedido: any) => pedido.comercial === this.nombre) // Filtrar por comercial_id
        .map((pedido: any) => ({
          fecha: pedido.fecha,
          total: pedido.total,
          cliente: pedido.cliente,
          id: pedido.id
        }));
      console.log(this.pedidos);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }
  

  // Método para navegar hacia atrás
  goBack() {
    this.location.back();
  }
}