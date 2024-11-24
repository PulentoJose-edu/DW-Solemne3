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

  async totalProductos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos-mas-vendidos/');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  async editProducto(producto: any) {
    try {
      const response = await axios.patch('http://127.0.0.1:8000/api/productos/'+producto.id+'/', producto);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  async eliminarProducto(productoId: string ) {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/productos/'+productoId+'/');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
}
