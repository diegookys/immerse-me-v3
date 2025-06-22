// frontend/src/components/FillInTheBlankGame.js

import React, { useState, useEffect } from 'react'; // 1. Adicionamos o useEffect
import './FillInTheBlankGame.css';

function FillInTheBlankGame({ questionData, onComplete }) {
    const [selectedWord, setSelectedWord] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const { frase, opcoes, respostaCorreta } = questionData.dados;

    // 2. Este useEffect reinicia o estado do componente a cada nova pergunta.
    useEffect(() => {
        setSelectedWord(null);
        setIsCorrect(null);
    }, [questionData]); // A dependência [questionData] garante que isso aconteça sempre que a pergunta mudar.

    const handleOptionClick = (word) => {
        if (isCorrect !== null) return;

        setSelectedWord(word);
        const correct = word === respostaCorreta;
        setIsCorrect(correct);

        setTimeout(() => onComplete(correct), 1500);
    };

    return (
        <div className="game-container fill-blank-container">
            <h3>Complete the sentence:</h3>
            
            <div className="sentence-box">
                {frase.map((part, index) => 
                    part === null ? (
                        <span key={index} className={`blank ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
                            {selectedWord || '______'}
                        </span>
                    ) : (
                        <span key={index} className="sentence-part">{part}</span>
                    )
                )}
            </div>

            <div className="word-bank">
                {opcoes.map((option) => (
                    <button
                        key={option}
                        className="word-option"
                        onClick={() => handleOptionClick(option)}
                        disabled={selectedWord !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FillInTheBlankGame;