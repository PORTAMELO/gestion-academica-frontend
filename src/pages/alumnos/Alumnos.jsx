import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './Alumnos.css';

function Alumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
    });
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const cargarAlumnos = async () => {
        try {
            const response = await api.get('/alumnos');
            setAlumnos(response.data);
        } catch (err) {
            setError('Error al cargar los alumnos');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editandoId) {
                await api.put(`/alumnos/${editandoId}`, form);
            } else {
                await api.post('/alumnos', form);
            }
            setForm({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
            setEditandoId(null);
            cargarAlumnos();
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al guardar el alumno');
        }
    };

    const handleEditar = (alumno) => {
        setForm({
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            email: alumno.email,
            fechaNacimiento: alumno.fechaNacimiento,
        });
        setEditandoId(alumno.id);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este alumno?')) return;
        try {
            await api.delete(`/alumnos/${id}`);
            cargarAlumnos();
        } catch (err) {
            setError('Error al eliminar el alumno');
        }
    };

    const handleCancelar = () => {
        setForm({ nombre: '', apellido: '', email: '', fechaNacimiento: '' });
        setEditandoId(null);
        setError('');
    };

    return (
        <div className="page">
            <h2 className="page-title">Alumnos</h2>

            {error && <div className="alert-error">{error}</div>}

            <div className="card">
                <h3>{editandoId ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                placeholder="Apellido"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="correo@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Nacimiento</label>
                            <input
                                name="fechaNacimiento"
                                type="date"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
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
                <h3>Lista de Alumnos</h3>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Fecha Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty">No hay alumnos registrados</td>
                            </tr>
                        ) : (
                            alumnos.map((alumno) => (
                                <tr key={alumno.id}>
                                    <td>{alumno.id}</td>
                                    <td>{alumno.nombre}</td>
                                    <td>{alumno.apellido}</td>
                                    <td>{alumno.email}</td>
                                    <td>{alumno.fechaNacimiento}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEditar(alumno)}>
                                            Editar
                                        </button>
                                        <button className="btn-delete" onClick={() => handleEliminar(alumno.id)}>
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

export default Alumnos;