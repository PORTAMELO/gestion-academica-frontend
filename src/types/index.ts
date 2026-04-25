export interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
}

export interface Materia {
  id?: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface Nota {
  id?: number;
  valor: number;
  fecha_registro?: string;
  alumno: Alumno;
  materia: Materia;
}

export interface NotaPayload {
  valor: number;
  alumnoId: number;
  materiaId: number;
}

export type ActiveSection = 'home' | 'alumnos' | 'materias' | 'notas';
