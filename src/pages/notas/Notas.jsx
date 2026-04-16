import { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../alumnos/Alumnos.css';

function Notas() {
    const [notas, setNotas] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({
        alumnoId: '',
        materiaId: '',
        valor: '',
    });
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarAlumnos();
        cargarMaterias();
    }, []);

    const cargarAlumnos = async () => {
        try {
            const response = await api.get('/alumnos');
            setAlumnos(response.data);
        } catch (err) {
            setError('Error al cargar los alumnos');
        }
    };

    const cargarMaterias = async () => {
        try {
            const response = await api.get('/materias');
            setMaterias(response.data);
        } catch (err) {
            setError('Error al cargar las materias');
        }
    };

    const cargarNotasPorAlumno = async (alumnoId) => {
        try {
            const response = await api.get(`/notas/alumno/${alumnoId}`);
            setNotas(response.data);
        } catch (err) {
            setError('Error al cargar las notas');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAlumnoChange = (e) => {
        const id = e.target.value;
        setForm({ ...form, alumnoId: id });
        if (id) {
            const alumno = alumnos.find((a) => a.id === parseInt(id));
            setAlumnoSeleccionado(alumno);
            cargarNotasPorAlumno(id);
        } else {
            setAlumnoSeleccionado(null);
            setNotas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/notas', {
                alumnoId: parseInt(form.alumnoId),
                materiaId: parseInt(form.materiaId),
                valor: parseFloat(form.valor),
            });
            setForm({ ...form, materiaId: '', valor: '' });
            cargarNotasPorAlumno(form.alumnoId);
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al registrar la nota');
        }
    };

    return (
        <div className="page">
            <h2 className="page-title">Notas</h2>

            {error && <div className="alert-error">{error}</div>}

            <div className="card">
                <h3>Registrar Nota</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Alumno</label>
                            <select
                                name="alumnoId"
                                value={form.alumnoId}
                                onChange={handleAlumnoChange}
                                required
                            >
                                <option value="">Seleccionar alumno</option>
                                {alumnos.map((alumno) => (
                                    <option key={alumno.id} value={alumno.id}>
                                        {alumno.nombre} {alumno.apellido}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Materia</label>
                            <select
                                name="materiaId"
                                value={form.materiaId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar materia</option>
                                {materias.map((materia) => (
                                    <option key={materia.id} value={materia.id}>
                                        {materia.nombre} ({materia.codigo})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Valor (0.0 - 5.0)</label>
                            <input
                                name="valor"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={form.valor}
                                onChange={handleChange}
                                placeholder="Ej: 4.5"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            Registrar Nota
                        </button>
                    </div>
                </form>
            </div>

            <div className="card">
                <h3>
                    {alumnoSeleccionado
                        ? `Notas de ${alumnoSeleccionado.nombre} ${alumnoSeleccionado.apellido}`
                        : 'Selecciona un alumno para ver sus notas'}
                </h3>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Materia</th>
                            <th>Valor</th>
                            <th>Fecha Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="empty">
                                    {alumnoSeleccionado
                                        ? 'Este alumno no tiene notas registradas'
                                        : 'Selecciona un alumno para ver sus notas'}
                                </td>
                            </tr>
                        ) : (
                            notas.map((nota) => (
                                <tr key={nota.id}>
                                    <td>{nota.id}</td>
                                    <td>{nota.materia?.nombre}</td>
                                    <td>{nota.valor}</td>
                                    <td>{nota.fechaRegistro}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notas;