// frontend/src/pages/ObjectivePage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

function ObjectivePage() {
    const [selection, setSelection] = useState('');
    const navigate = useNavigate();
    
    // Opções baseadas no protótipo
    const options = [
        "Obter um certificado",
        "Estudar por hobby",
        "Viajar",
        "Utilizar para o trabalho"
    ];

    const handleContinue = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ objetivo: selection }),
            });
            navigate('/onboarding/interest');
        } catch (error) {
            console.error("Erro ao salvar objetivo:", error);
        }
    };

    return (
        <div className="onboarding-container">
            <h2>Qual é o seu objetivo?</h2>
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
                Avançar
            </button>
        </div>
    );
}

export default ObjectivePage;