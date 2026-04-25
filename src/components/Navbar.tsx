import React from 'react';
import type { ActiveSection } from '../types';
import './Navbar.css';

interface NavbarProps {
  active: ActiveSection;
  onNavigate: (s: ActiveSection) => void;
}

const links: { id: ActiveSection; label: string; emoji: string; color: string }[] = [
  { id: 'home',     label: 'Inicio',   emoji: '🏠', color: '#f0f0f8' },
  { id: 'alumnos',  label: 'Alumnos',  emoji: '🎓', color: '#A78BFA' },
  { id: 'materias', label: 'Materias', emoji: '📚', color: '#67E8F9' },
  { id: 'notas',    label: 'Notas',    emoji: '📝', color: '#6EE7B7' },
];

const Navbar: React.FC<NavbarProps> = ({ active, onNavigate }) => (
  <nav className="navbar">
    <div className="navbar-brand" onClick={() => onNavigate('home')}>
      <span className="brand-icon">🎓</span>
      <span className="brand-text">GestiónAcademica</span>
    </div>
    <div className="navbar-links">
      {links.map(l => (
        <button
          key={l.id}
          className={`nav-link ${active === l.id ? 'active' : ''}`}
          style={{ '--link-color': l.color } as React.CSSProperties}
          onClick={() => onNavigate(l.id)}
        >
          <span className="nav-emoji">{l.emoji}</span>
          <span className="nav-label">{l.label}</span>
          {active === l.id && <span className="nav-dot" />}
        </button>
      ))}
    </div>
  </nav>
);

export default Navbar;
