import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VentasServiceService {

  constructor() { }

  async login(username: string, password: string) {
    const loginData = {
      nombre: username,
      password: password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/comercial/login/', loginData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async getComercialId(username: string, password: string) {
    const loginData = {
      nombre: username,
      password: password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/get_comercial_id/', loginData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async registerUser(user: { nombre: string; apellido1: string; comision: string; password: string }) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/comerciales/', user);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async fetchPedidos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pedidos');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async fetchProductos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async fetchClientes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  async enviarCorreo(pedido: { total: string; fecha: string; cliente: number; comercial: number; correoElectronico: string }) {
    try {
      console.log('Enviando correo con los siguientes datos:', pedido);
      const response = await axios.post('http://127.0.0.1:8000/api/send-email/', pedido);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async crearPedido(pedido: { 
    fecha: string; 
    cliente: number; 
    comercial: number;  
    detalles: Array<{ producto: number; cantidad: number; }>
  }) {
    try {
      console.log('Enviando pedido:', pedido); // Agrega este log para verificar la estructura del pedido
      // Realizar la solicitud POST para crear el pedido
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', pedido);
      return response.data;  // Devuelve la respuesta del servidor
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;  // Lanza el error si ocurre algún problema
    }
  }


  async fetchComerciales() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/comerciales');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  
  async validar(detalles: {producto: string; cantidad: string;}) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/validar/', detalles);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
  
}
