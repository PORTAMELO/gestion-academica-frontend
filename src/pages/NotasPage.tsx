import React, { useEffect, useState } from 'react';
import { alumnosService, materiasService, notasService } from '../services/api';
import type { Alumno, Materia, Nota } from '../types';
import './CrudPage.css';

const NotasPage: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState<number | ''>('');
  const [form, setForm] = useState({ alumnoId: '', materiaId: '', valor: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    alumnosService.getAll().then(setAlumnos).catch(() => setError('Error cargando alumnos'));
    materiasService.getAll().then(setMaterias).catch(() => setError('Error cargando materias'));
  }, []);

  const loadNotas = async (alumnoId: number) => {
    setLoading(true);
    try {
      const data = await notasService.getByAlumno(alumnoId);
      setNotas(data);
    } catch { setError('Error al cargar notas'); }
    finally { setLoading(false); }
  };

  const handleAlumnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedAlumno(id);
    if (id) loadNotas(id);
    else setNotas([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const valor = Number(form.valor);
    if (valor < 0 || valor > 5) {
      setError('La nota debe estar entre 0 y 5');
      return;
    }
    try {
      await notasService.create({
        alumnoId: Number(form.alumnoId),
        materiaId: Number(form.materiaId),
        valor,
      });
      setForm({ alumnoId: '', materiaId: '', valor: '' });
      setShowForm(false);
      if (selectedAlumno) loadNotas(selectedAlumno as number);
    } catch { setError('Error al registrar nota. Verifica los datos.'); }
  };

  const getNotaColor = (valor: number) => {
    if (valor >= 4) return '#10B981';
    if (valor >= 3) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <span className="crud-badge" style={{ '--badge-color': '#10B981' } as React.CSSProperties}>Notas</span>
          <h2 className="crud-title">📝 Gestión de Notas</h2>
        </div>
        <button className="btn-primary" style={{ '--btn-color': '#10B981' } as React.CSSProperties}
          onClick={() => setShowForm(true)}>
          + Registrar Nota
        </button>
      </div>

      {error && <div className="crud-error">{error}</div>}

      {showForm && (
        <div className="form-card" style={{ '--form-color': '#10B981' } as React.CSSProperties}>
          <h3 className="form-title">Registrar Nota</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Alumno</label>
              <select required value={form.alumnoId} onChange={e => setForm({ ...form, alumnoId: e.target.value })}>
                <option value="">Seleccionar alumno...</option>
                {alumnos.map(a => (
                  <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Materia</label>
              <select required value={form.materiaId} onChange={e => setForm({ ...form, materiaId: e.target.value })}>
                <option value="">Seleccionar materia...</option>
                {materias.map(m => (
                  <option key={m.id} value={m.id}>{m.nombre} ({m.codigo})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Valor (0 - 5)</label>
              <input required type="number" step="0.1" min={0} max={5}
                value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })}
                placeholder="Ej: 4.5" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ '--btn-color': '#10B981' } as React.CSSProperties}>
                Registrar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtro por alumno */}
      <div className="filter-section">
        <label className="filter-label">Consultar notas por alumno:</label>
        <select className="filter-select" value={selectedAlumno} onChange={handleAlumnoChange}>
          <option value="">Seleccionar alumno...</option>
          {alumnos.map(a => (
            <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
          ))}
        </select>
      </div>

      {selectedAlumno && (
        loading ? (
          <div className="loading-state">
            <div className="spinner" style={{ '--spin-color': '#10B981' } as React.CSSProperties} />
            <span>Cargando notas...</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="crud-table">
              <thead>
                <tr><th>ID</th><th>Alumno</th><th>Materia</th><th>Nota</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {notas.length === 0 ? (
                  <tr><td colSpan={5} className="empty-row">Este alumno no tiene notas registradas</td></tr>
                ) : notas.map(n => (
                  <tr key={n.id}>
                    <td><span className="id-badge">#{n.id}</span></td>
                    <td>{n.alumno?.nombre} {n.alumno?.apellido}</td>
                    <td>{n.materia?.nombre}</td>
                    <td>
                      <span className="nota-badge" style={{ background: getNotaColor(n.valor) }}>
                        {n.valor.toFixed(1)}
                      </span>
                    </td>
                    <td>{n.fecha_registro?.split('T')[0] ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default NotasPage;
