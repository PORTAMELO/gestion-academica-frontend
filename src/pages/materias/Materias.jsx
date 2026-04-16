import { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../alumnos/Alumnos.css';

function Materias() {
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        codigo: '',
        creditos: '',
    });
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarMaterias();
    }, []);

    const cargarMaterias = async () => {
        try {
            const response = await api.get('/materias');
            setMaterias(response.data);
        } catch (err) {
            setError('Error al cargar las materias');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const payload = { ...form, creditos: parseInt(form.creditos) };
            if (editandoId) {
                await api.put(`/materias/${editandoId}`, payload);
            } else {
                await api.post('/materias', payload);
            }
            setForm({ nombre: '', codigo: '', creditos: '' });
            setEditandoId(null);
            cargarMaterias();
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al guardar la materia');
        }
    };

    const handleEditar = (materia) => {
        setForm({
            nombre: materia.nombre,
            codigo: materia.codigo,
            creditos: materia.creditos,
        });
        setEditandoId(materia.id);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar esta materia?')) return;
        try {
            await api.delete(`/materias/${id}`);
            cargarMaterias();
        } catch (err) {
            setError('Error al eliminar la materia');
        }
    };

    const handleCancelar = () => {
        setForm({ nombre: '', codigo: '', creditos: '' });
        setEditandoId(null);
        setError('');
    };

    return (
        <div className="page">
            <h2 className="page-title">Materias</h2>

            {error && <div className="alert-error">{error}</div>}

            <div className="card">
                <h3>{editandoId ? 'Editar Materia' : 'Nueva Materia'}</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Nombre de la materia"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Código</label>
                            <input
                                name="codigo"
                                value={form.codigo}
                                onChange={handleChange}
                                placeholder="Ej: MAT-101"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Créditos</label>
                            <input
                                name="creditos"
                                type="number"
                                min="1"
                                max="10"
                                value={form.creditos}
                                onChange={handleChange}
                                placeholder="Número de créditos"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {editandoId ? 'Actualizar' : 'Crear'}
                        </button>
                        {editandoId && (
                            <button type="button" className="btn-secondary" onClick={handleCancelar}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="card">
                <h3>Lista de Materias</h3>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Créditos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty">No hay materias registradas</td>
                            </tr>
                        ) : (
                            materias.map((materia) => (
                                <tr key={materia.id}>
                                    <td>{materia.id}</td>
                                    <td>{materia.nombre}</td>
                                    <td>{materia.codigo}</td>
                                    <td>{materia.creditos}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEditar(materia)}>
                                            Editar
                                        </button>
                                        <button className="btn-delete" onClick={() => handleEliminar(materia.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Materias;