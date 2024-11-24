import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location
import { ActivatedRoute, Router } from '@angular/router';
import { VentasServiceService } from '../ventas-service.service'; // Import the service
import axios from 'axios';

@Component({
  selector: 'app-generar-pedido',
  standalone: true,
  templateUrl: './generar-pedido.component.html',
  styleUrls: ['./generar-pedido.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GenerarPedidoComponent {
  nombre: string = '';
  productos: Array<{ productoId: string; cantidad: number;}> = [];
  pedido: any = { productos: [] };
  productoSeleccionado: any;
  productoApi: any[]= []
  cantidad: number = 0;
  errorMessage: string = ''; // Producto actualmente seleccionado
  total: number = 0;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private ventasService: VentasServiceService // Inject the service
  ) {}

  ngOnInit() {
    this.nombre = this.route.snapshot.paramMap.get('nombre') || ''; // Obtener el parámetro como string
    console.log(this.nombre); // Verificar el valor convertido
    this.fetchProductos();
  }

  async fetchProductos() {
    try {
      const response = await this.ventasService.fetchProductos();
      this.productoApi = response;
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error: unknown) {
      this.errorMessage = 'Error al obtener los productos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

  async agregarProducto() {
    console.log(this.productoSeleccionado);
    const validación = {
      producto: this.productoSeleccionado.id,
      cantidad: this.cantidad
    };

    try {
      const requestValidacion = await this.ventasService.validar(validación);
      if (requestValidacion ) {
        this.total += requestValidacion.total; // Actualizar la variable con el total devuelto por la API
        console.log('Total devuelto por la API:', this.total);

        if (this.productoSeleccionado.id && this.cantidad > 0) {
          const productoExistente = this.pedido.productos.find(
            (producto: { productoId: any; }) => producto.productoId === this.productoSeleccionado.id
          );

          if (productoExistente) {
            // Si el producto ya existe, sumamos la cantidad
            productoExistente.cantidad += this.cantidad;
          } else {
            // Si no existe, lo agregamos al array de productos
            this.pedido.productos.push({
              productoId: this.productoSeleccionado.id,
              cantidad: this.cantidad,
              nombre: this.productoSeleccionado.nombre,
              precio: this.productoSeleccionado.precio
            });
          }
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La cantidad de productos excede el stock disponible.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al validar el producto:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al validar el producto.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para eliminar productos del pedido
  eliminarProducto(productoId: number) {
    const productoAEliminar = this.pedido.productos.find(
      (producto: { productoId: number; cantidad: number; precio: number }) => producto.productoId === productoId
    );
  
    if (productoAEliminar) {
      // Restar el precio total del producto (precio * cantidad) del total actual
      this.total -= productoAEliminar.precio * productoAEliminar.cantidad;
  
      // Eliminar el producto del pedido
      this.pedido.productos = this.pedido.productos.filter(
        (producto: { productoId: number; cantidad: number; precio?: number }) => producto.productoId !== productoId
      );
    }
  }
  async crearPedido(event: Event) {
    event.preventDefault();
    const pedido = {
      total: '0',
      correoElectronico: this.pedido.correoElectronico,
      cliente: parseInt(this.pedido.cliente.toString(), 10),
      comercial: parseInt(this.pedido.comercial.toString(), 10),
      fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      detalles: this.pedido.productos.map((p: { productoId: string; cantidad: number }) => ({
        producto: parseInt(p.productoId.toString(), 10),
        cantidad: parseInt(p.cantidad.toString(), 10)
      }))
    };
    const pedidoCorreo = {
      total: this.total.toString(),
      correoElectronico: this.pedido.correoElectronico,
      cliente: parseInt(this.pedido.cliente.toString(), 10),
      comercial: parseInt(this.pedido.comercial.toString(), 10),
      fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    }
    try {
      // Validar los valores de cliente y comercial
      const nombreNormalizado = this.nombre.toString().trim().toLowerCase();
      const comercialNormalizado = this.pedido.comercial.toString().trim().toLowerCase();

      if (nombreNormalizado !== comercialNormalizado) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'El nombre no coincide con el comercial.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
      // Crear el pedido llamando al servicio
      console.log('Creando pedido:', pedido);
      const response = await this.ventasService.crearPedido(pedido);
      console.log('Pedido creado exitosamente:', response);

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Pedido creado exitosamente. Se ha enviado un comprobante al correo.',
        buttons: ['OK']
      });
      await alert.present();

      // Enviar correo
      const responseEmail = await this.ventasService.enviarCorreo(pedidoCorreo);
      console.log('Correo enviado exitosamente:', responseEmail);
    } catch (error: unknown) {
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
  
  

