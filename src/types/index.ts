export interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
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
  fechaRegistro?: string;
  alumno: Alumno;
  materia: Materia;
}

export interface NotaPayload {
  valor: number;
  alumnoId: number;
  materiaId: number;
}

export type ActiveSection = 'home' | 'alumnos' | 'materias' | 'notas';
