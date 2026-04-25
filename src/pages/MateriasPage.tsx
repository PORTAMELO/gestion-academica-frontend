import React, { useEffect, useState } from 'react';
import { materiasService } from '../services/api';
import type { Materia } from '../types';
import './CrudPage.css';

const empty: Materia = { nombre: '', codigo: '', creditos: 0 };

const MateriasPage: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [form, setForm] = useState<Materia>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await materiasService.getAll();
      setMaterias(data);
    } catch { setError('Error al cargar materias'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editing !== null) {
        await materiasService.update(editing, form);
      } else {
        await materiasService.create(form);
      }
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      load();
    } catch { setError('Error al guardar. Verifica los datos.'); }
  };

  const handleEdit = (m: Materia) => {
    setForm(m);
    setEditing(m.id!);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta materia?')) return;
    try {
      await materiasService.delete(id);
      load();
    } catch { setError('Error al eliminar.'); }
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <span className="crud-badge" style={{ '--badge-color': '#06B6D4' } as React.CSSProperties}>Materias</span>
          <h2 className="crud-title">📚 Gestión de Materias</h2>
        </div>
        <button className="btn-primary" style={{ '--btn-color': '#06B6D4' } as React.CSSProperties}
          onClick={() => { setForm(empty); setEditing(null); setShowForm(true); }}>
          + Nueva Materia
        </button>
      </div>

      {error && <div className="crud-error">{error}</div>}

      {showForm && (
        <div className="form-card" style={{ '--form-color': '#06B6D4' } as React.CSSProperties}>
          <h3 className="form-title">{editing ? 'Editar Materia' : 'Nueva Materia'}</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nombre</label>
              <input required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Matemáticas" />
            </div>
            <div className="form-group">
              <label>Código</label>
              <input required value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} placeholder="MAT-101" />
            </div>
            <div className="form-group">
              <label>Créditos</label>
              <input required type="number" min={1} max={10} value={form.creditos}
                onChange={e => setForm({ ...form, creditos: Number(e.target.value) })} placeholder="3" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ '--btn-color': '#06B6D4' } as React.CSSProperties}>
                {editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" style={{ '--spin-color': '#06B6D4' } as React.CSSProperties} />
          <span>Cargando materias...</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="crud-table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Código</th><th>Créditos</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {materias.length === 0 ? (
                <tr><td colSpan={5} className="empty-row">No hay materias registradas</td></tr>
              ) : materias.map(m => (
                <tr key={m.id}>
                  <td><span className="id-badge">#{m.id}</span></td>
                  <td>{m.nombre}</td>
                  <td><span className="code-badge">{m.codigo}</span></td>
                  <td><span className="credits-badge">{m.creditos} cr.</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => handleEdit(m)}>✏️ Editar</button>
                      <button className="btn-delete" onClick={() => handleDelete(m.id!)}>🗑️ Eliminar</button>
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

export default MateriasPage;
