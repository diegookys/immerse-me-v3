// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Importe os componentes
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ObjectivePage from './pages/ObjectivePage';
import InterestPage from './pages/InterestPage';
import LevelPage from './pages/LevelPage';
import LanguageSelectionPage from './pages/LanguageSelectionPage';
import LessonMapPage from './pages/LessonMapPage';
import LessonPage from './pages/LessonPage';
import LessonResultsPage from './pages/LessonResultsPage';
import ProgressPage from './pages/ProgressPage'; // <-- ESTA É A LINHA QUE FALTAVA
import VideoCallPage from './pages/VideoCallPage';

import mascoteImg from './assets/mascote.png';
import './App.css';

// Componente para a página inicial (tela de boas-vindas)
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="home-content">
                <img src={mascoteImg} alt="Mascote do Immerse Me" className="mascote-image" />
                <h1>Immerse Me</h1>
                <p>A sua jornada para a fluência cultural começa aqui.</p>
                <div className="home-buttons">
                    <button onClick={() => navigate('/language-selection')}>Vamos Começar Agora</button>
                    <button onClick={() => navigate('/login')} className="secondary">Login</button>
                </div>
                 <p className="register-link" onClick={() => navigate('/register')}>
                    Não tem uma conta? <strong>Cadastre-se</strong>
                </p>
            </div>
        </div>
    );
}


function App() {
  return (
    <Router>
      <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/language-selection" element={<LanguageSelectionPage />} />
        <Route path="/learn/:languageId" element={<LessonMapPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/lesson-results/:score" element={<LessonResultsPage />} />

        {/* --- Rotas Protegidas (Exigem Login) --- */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/onboarding/objective"
          element={<ProtectedRoute><ObjectivePage /></ProtectedRoute>}
        />
        <Route
          path="/onboarding/interest"
          element={<ProtectedRoute><InterestPage /></ProtectedRoute>}
        />
        <Route
          path="/onboarding/level"
          element={<ProtectedRoute><LevelPage /></ProtectedRoute>}
        />
        <Route
          path="/progress"
          element={<ProtectedRoute><ProgressPage /></ProtectedRoute>}
        />
        <Route
          path="/videocall"
          element={<ProtectedRoute><VideoCallPage /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;