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

  async crearPedido(pedido: { total: string; fecha: string; cliente: string; comercial: string; correoElectronico: string }) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', pedido);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async enviarCorreo(pedido: { total: string; fecha: string; cliente: string; comercial: string; correoElectronico: string }) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-email/', pedido);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw axiosError;
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
}
