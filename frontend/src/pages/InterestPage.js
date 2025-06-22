// frontend/src/pages/InterestPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

function InterestPage() {
    const [selection, setSelection] = useState('');
    const navigate = useNavigate();
    
    // prototipo [teste de software - immerse-me.pdf, p. 35]
    const options = ["Viagem", "Arte", "Comida", "Livros"];

    const handleContinue = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ interesse: selection }),
            });
            navigate('/onboarding/level'); 
        } catch (error) {
            console.error("Erro ao salvar interesse:", error);
        }
    };

    return (
        <div className="onboarding-container">
            <h2>Qual é o seu interesse?</h2>
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

export default InterestPage;