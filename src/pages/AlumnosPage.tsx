import React, { useEffect, useState } from 'react';
import { alumnosService } from '../services/api';
import type { Alumno } from '../types';
import './CrudPage.css';

const empty: Alumno = { nombre: '', apellido: '', email: '', fecha_nacimiento: '' };

const AlumnosPage: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [form, setForm] = useState<Alumno>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await alumnosService.getAll();
      setAlumnos(data);
    } catch { setError('Error al cargar alumnos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editing !== null) {
        await alumnosService.update(editing, form);
      } else {
        await alumnosService.create(form);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      load();
    } catch { setError('Error al guardar. Verifica los datos.'); }
  };

  const handleEdit = (a: Alumno) => {
    setForm(a);
    setEditing(a.id!);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este alumno?')) return;
    try {
      await alumnosService.delete(id);
      load();
    } catch { setError('Error al eliminar.'); }
  };

  const handleNew = () => {
    setForm(empty);
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <span className="crud-badge" style={{ '--badge-color': '#6C63FF' } as React.CSSProperties}>Alumnos</span>
          <h2 className="crud-title">🎓 Gestión de Alumnos</h2>
        </div>
        <button className="btn-primary" style={{ '--btn-color': '#6C63FF' } as React.CSSProperties} onClick={handleNew}>
          + Nuevo Alumno
        </button>
      </div>

      {error && <div className="crud-error">{error}</div>}

      {showForm && (
        <div className="form-card" style={{ '--form-color': '#6C63FF' } as React.CSSProperties}>
          <h3 className="form-title">{editing ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nombre</label>
              <input required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Juan" />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input required value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} placeholder="Pérez" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="juan@email.com" />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input required type="date" value={form.fecha_nacimiento} onChange={e => setForm({ ...form, fecha_nacimiento: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ '--btn-color': '#6C63FF' } as React.CSSProperties}>
                {editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" style={{ '--spin-color': '#6C63FF' } as React.CSSProperties} />
          <span>Cargando alumnos...</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Nacimiento</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.length === 0 ? (
                <tr><td colSpan={6} className="empty-row">No hay alumnos registrados</td></tr>
              ) : alumnos.map(a => (
                <tr key={a.id}>
                  <td><span className="id-badge">#{a.id}</span></td>
                  <td>{a.nombre}</td>
                  <td>{a.apellido}</td>
                  <td>{a.email}</td>
                  <td>{a.fecha_nacimiento}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => handleEdit(a)}>✏️ Editar</button>
                      <button className="btn-delete" onClick={() => handleDelete(a.id!)}>🗑️ Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlumnosPage;
