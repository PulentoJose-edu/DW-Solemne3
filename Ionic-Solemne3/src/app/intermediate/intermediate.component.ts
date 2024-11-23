import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-intermediate',
  templateUrl: './intermediate.component.html',
  styleUrls: ['./intermediate.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IntermediateComponent {

  nombre: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.nombre = this.route.snapshot.paramMap.get('nombre') || '';
    console.log(this.nombre)
  }

  // Método para redirigir al Home
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToPedidos(){
    this.router.navigate(['/pedidos']);
  }

 // Método para redirigir a Comerciales
 goToComerciales() {
  this.router.navigate(['/comerciales']);
  }

  goToProducto(){
    this.router.navigate(['/productos'],);
  }
  //Metodo para redirigir a generar pedido
  goToGenerarPedido(){
    this.router.navigate(['/generar-pedido', this.nombre]);
  }

  goToPedidosCliente(){
    this.router.navigate(['/pedidos-cliente', this.nombre],);
  }

  
}
