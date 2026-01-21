import { CreateHostSistemaDTO, HostSistema, UpdateHostSistemaDTO } from "../types/host-sistema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const RUC_STORAGE_KEY = 'current_ruc';

class HostSistemaService {
  private getHeaders(): HeadersInit {
    const ruc = localStorage.getItem(RUC_STORAGE_KEY);
    return {
      'Content-Type': 'application/json',
      'ruc': ruc || '',
    };
  }

  async getAll(): Promise<HostSistema[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/host-sistema`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener hosts del sistema: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<HostSistema> {
    try {
      const response = await fetch(`${API_BASE_URL}/host-sistema/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener host del sistema: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  }

  async create(data: CreateHostSistemaDTO): Promise<HostSistema> {
    try {
      const response = await fetch(`${API_BASE_URL}/host-sistema`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al crear host del sistema: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  }

  async update(id: number, data: UpdateHostSistemaDTO): Promise<HostSistema> {
    try {
      const response = await fetch(`${API_BASE_URL}/host-sistema/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar host del sistema: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/host-sistema/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar host del sistema: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  }
}

export const hostSistemaService = new HostSistemaService();