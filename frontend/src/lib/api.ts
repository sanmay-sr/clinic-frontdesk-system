const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  gender: 'male' | 'female' | 'other';
  location: string;
  availability: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  notes?: string;
  doctorId: number;
  doctor?: Doctor;
  dateTime: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface QueueItem {
  id: number;
  patientName: string;
  patientPhone: string;
  queueNumber: number;
  status: 'waiting' | 'with_doctor' | 'completed';
  isUrgent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async getDoctors(): Promise<Doctor[]> {
    const response = await fetch(`${API_URL}/doctors`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }

    return response.json();
  }

  async createDoctor(doctor: Partial<Doctor>): Promise<Doctor> {
    const response = await fetch(`${API_URL}/doctors`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(doctor),
    });

    if (!response.ok) {
      throw new Error('Failed to create doctor');
    }

    return response.json();
  }

  async updateDoctor(id: number, doctor: Partial<Doctor>): Promise<Doctor> {
    const response = await fetch(`${API_URL}/doctors/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(doctor),
    });

    if (!response.ok) {
      throw new Error('Failed to update doctor');
    }

    return response.json();
  }

  async deleteDoctor(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/doctors/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete doctor');
    }
  }

  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_URL}/appointments`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  }

  async createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    return response.json();
  }

  async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error('Failed to update appointment');
    }

    return response.json();
  }

  async deleteAppointment(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }
  }

  async getQueue(): Promise<QueueItem[]> {
    const response = await fetch(`${API_URL}/queue`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch queue');
    }

    return response.json();
  }

  async createQueueItem(queueItem: Partial<QueueItem>): Promise<QueueItem> {
    const response = await fetch(`${API_URL}/queue`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(queueItem),
    });

    if (!response.ok) {
      throw new Error('Failed to create queue item');
    }

    return response.json();
  }

  async updateQueueStatus(id: number, status: QueueItem['status']): Promise<QueueItem> {
    const response = await fetch(`${API_URL}/queue/${id}/status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update queue status');
    }

    return response.json();
  }

  async deleteQueueItem(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/queue/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete queue item');
    }
  }
}

export const apiService = new ApiService();
