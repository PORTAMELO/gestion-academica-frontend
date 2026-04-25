import React, { useState } from 'react';
import type { ActiveSection } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AlumnosPage from './pages/AlumnosPage';
import MateriasPage from './pages/MateriasPage';
import NotasPage from './pages/NotasPage';
import './App.css';

const App: React.FC = () => {
  const [section, setSection] = useState<ActiveSection>('home');

  const renderPage = () => {
    switch (section) {
      case 'alumnos':  return <AlumnosPage />;
      case 'materias': return <MateriasPage />;
      case 'notas':    return <NotasPage />;
      default:         return <Home onNavigate={setSection} />;
    }
  };

  return (
    <div className="app">
      <Navbar active={section} onNavigate={setSection} />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
