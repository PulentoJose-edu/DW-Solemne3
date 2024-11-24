import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { PedidoProductoService } from '../pedido-producto.service';
import { get } from 'http';
import { runPostSignalSetFn } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  chartPie: any;
  productosVendidos: any[] = [];
  
  errorMessage: string = '';

  constructor(
    private pedidosProductosService: PedidoProductoService // Inyección del servicio
  ) {}

  public configPie: any = {
    type: 'pie',
    labels: 'Productos mas vendidos',  
    data: {
      labels: [], 
      datasets: [
        {
          label: 'Productos mas vendidos',
          data: [], 
          backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'black'],
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Productos mas vendidos'
        }
      }
    },
  };  
  public configLine: any = {
    type: 'line',
    data: {
      labels: [], 
      datasets: [
        {
          label: 'Cantidad de pedidos',
          data: [], 
          backgroundColor: 'blue',
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Pedidos por Año'
        }
      }
    },
  };

  
  async productVendido() {
    try {
      const response = await this.pedidosProductosService.totalProductos();
      this.productosVendidos = response;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error: unknown) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

  updatePieChart() {
    try{
       
      const labels = this.productosVendidos.map((producto: any) => producto.nombre);
      const data = this.productosVendidos.map((producto: any) => producto.total_vendido);

      this.configPie.data.labels = labels;
      this.configPie.data.datasets[0].data = data;

    }    
    catch(error: unknown){
      console.log('Error al actualizar el gráfico:', error);
    }
  }

  async getProductos() {
    console.log('Productos vendidos:', this.productosVendidos);
    this.productVendido();
    console.log('Productos vendidos:', this.productosVendidos);
    setTimeout(() => {
      this.updatePieChart();  
      this.createCharts();
    }, 3000);
  }
  
  createCharts() {
    console.log('Productos vendidos:', this.productosVendidos);
    this.chartPie = new Chart('MyChartPie', this.configPie);
  }
  ngOnInit() {
    this.getProductos();
    
  }
}
