import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    const links = [
        { path: '/alumnos', label: 'Alumnos' },
        { path: '/materias', label: 'Materias' },
        { path: '/notas', label: 'Notas' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Gestión Académica</h1>
            </div>
            <ul className="navbar-links">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;