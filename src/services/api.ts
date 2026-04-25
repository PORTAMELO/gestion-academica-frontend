import axios from 'axios';
import type { Alumno, Materia, NotaPayload } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Alumnos
export const alumnosService = {
  getAll: () => api.get('/alumnos').then(r => r.data),
  getById: (id: number) => api.get(`/alumnos/${id}`).then(r => r.data),
  create: (data: Alumno) => api.post('/alumnos', data).then(r => r.data),
  update: (id: number, data: Alumno) => api.put(`/alumnos/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/alumnos/${id}`),
};

// Materias
export const materiasService = {
  getAll: () => api.get('/materias').then(r => r.data),
  getById: (id: number) => api.get(`/materias/${id}`).then(r => r.data),
  create: (data: Materia) => api.post('/materias', data).then(r => r.data),
  update: (id: number, data: Materia) => api.put(`/materias/${id}`, data).then(r => r.data),
  delete: (id: number) => api.delete(`/materias/${id}`),
};

// Notas
export const notasService = {
  getByAlumno: (alumnoId: number) => api.get(`/notas/alumno/${alumnoId}`).then(r => r.data),
  create: (data: NotaPayload) => api.post('/notas', data).then(r => r.data),
};
