import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {

  constructor() { }
  async crearProducto(producto: { nombre: string; precio: string; cantidad_disponible: string}) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/productos/', producto);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  async fetchProductos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
}
