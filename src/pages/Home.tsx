import React from 'react';
import type { ActiveSection } from '../types';
import './Home.css';

interface HomeProps {
  onNavigate: (section: ActiveSection) => void;
}

const cards = [
  {
    id: 'alumnos' as ActiveSection,
    title: 'Alumnos',
    subtitle: 'Gestión de estudiantes',
    description: 'Crea, consulta, edita y elimina alumnos del sistema académico.',
    emoji: '🎓',
    color: '#6C63FF',
    accent: '#A78BFA',
    bg: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)',
  },
  {
    id: 'materias' as ActiveSection,
    title: 'Materias',
    subtitle: 'Gestión de asignaturas',
    description: 'Administra las materias y asignaturas disponibles en el sistema.',
    emoji: '📚',
    color: '#06B6D4',
    accent: '#67E8F9',
    bg: 'linear-gradient(135deg, #0a2a35 0%, #0e4f6a 100%)',
  },
  {
    id: 'notas' as ActiveSection,
    title: 'Notas',
    subtitle: 'Registro de calificaciones',
    description: 'Registra y consulta las calificaciones de cada alumno por materia.',
    emoji: '📝',
    color: '#10B981',
    accent: '#6EE7B7',
    bg: 'linear-gradient(135deg, #052e1c 0%, #065f46 100%)',
  },
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-badge">Sistema Académico</div>
        <h1 className="home-title">
          Gestión <span className="home-title-accent">Académica</span>
        </h1>
        <p className="home-subtitle">
          Plataforma para administrar estudiantes, materias y calificaciones
        </p>
      </div>

      <div className="home-cards">
        {cards.map((card, i) => (
          <button
            key={card.id}
            className="entity-card"
            onClick={() => onNavigate(card.id)}
            style={{
              '--card-color': card.color,
              '--card-accent': card.accent,
              '--card-bg': card.bg,
              animationDelay: `${i * 0.12}s`,
            } as React.CSSProperties}
          >
            <div className="card-glow" />
            <div className="card-inner">
              <div className="card-icon-wrap">
                <span className="card-icon">{card.emoji}</span>
              </div>
              <div className="card-content">
                <span className="card-subtitle">{card.subtitle}</span>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="card-border" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
