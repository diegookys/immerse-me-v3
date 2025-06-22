// frontend/src/pages/LevelPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

function LevelPage() {
    const [selection, setSelection] = useState('');
    const navigate = useNavigate();
    
    // Opções baseadas no protótipo [cite: Teste de Software - IMMERSE ME (1).pdf, p. 38]
    const options = ["Iniciante", "Intermediário", "Avançado"];

    const handleContinue = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                // O nome no backend é 'nivelProficiencia'
                body: JSON.stringify({ nivelProficiencia: selection }),
            });
            // Navega para o dashboard, finalizando o onboarding
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Erro ao salvar nível:", error);
        }
    };

    return (
        <div className="onboarding-container">
            <h2>Qual é o seu nível?</h2>
            <div className="options-grid">
                {options.map((option) => (
                    <div
                        key={option}
                        className={`option-card ${selection === option ? 'selected' : ''}`}
                        onClick={() => setSelection(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            <button
                className="onboarding-button"
                disabled={!selection}
                onClick={handleContinue}
            >
                Finalizar
            </button>
        </div>
    );
}

// Garante que o componente seja exportado corretamente
export default LevelPage;