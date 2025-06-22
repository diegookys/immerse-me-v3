// frontend/src/pages/LessonResultsPage.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LessonResultsPage.css';

function LessonResultsPage() {
    const { score } = useParams();
    const navigate = useNavigate();
    
    // Verifica se o usuário está logado buscando o token no localStorage
    const isLoggedIn = !!localStorage.getItem('token');

    const handleContinue = () => {
        if (isLoggedIn) {
            // Se estiver logado, vai para o dashboard
            navigate('/dashboard');
        } else {
            // Se for um visitante, vai para a página de login
            navigate('/login');
        }
    };

    return (
        <div className="results-container">
            <div className="results-card">
                <h1>BOM JOGO!</h1>
                <p>Você completou a lição com</p>
                <div className="score-display">{score}</div>
                <p>pontos!</p>
                
                {/* Mostra uma mensagem diferente para visitantes */}
                {!isLoggedIn && (
                    <p className="signup-prompt">
                        Crie uma conta para salvar seu progresso!
                    </p>
                )}

                <button 
                    className="results-button" 
                    onClick={handleContinue}
                >
                    {/* O texto do botão agora é dinâmico */}
                    {isLoggedIn ? 'Continuar para o Perfil' : 'Fazer Login ou Cadastrar'}
                </button>
            </div>
        </div>
    );
}

export default LessonResultsPage;