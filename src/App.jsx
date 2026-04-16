import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alumnos from './pages/alumnos/Alumnos';
import Materias from './pages/materias/Materias';
import Notas from './pages/notas/Notas';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/alumnos" />} />
                    <Route path="/alumnos" element={<Alumnos />} />
                    <Route path="/materias" element={<Materias />} />
                    <Route path="/notas" element={<Notas />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;