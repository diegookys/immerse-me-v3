// frontend/src/components/ImageChoiceGame.js

import React, { useState, useEffect } from 'react'; // 1. Adicionamos o useEffect
import './ImageChoiceGame.css';

function ImageChoiceGame({ questionData, onComplete }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // 2. Este é o coração da correção.
    // O useEffect será executado toda vez que a 'questionData' mudar (ou seja, a cada nova pergunta).
    useEffect(() => {
        // Ele reinicia o estado do componente para uma nova pergunta.
        setSelectedOption(null);
        setIsCorrect(null);
    }, [questionData]); // A dependência [questionData] garante que isso aconteça a cada nova pergunta.


    const handleOptionClick = (option) => {
        if (isCorrect !== null) return;

        setSelectedOption(option);
        const correct = option === questionData.dados.respostaCorreta;
        setIsCorrect(correct);

        setTimeout(() => {
            onComplete(correct);
        }, 1500);
    };

    const getButtonClass = (option) => {
        if (isCorrect === null) return 'default';
        if (option === questionData.dados.respostaCorreta) return 'correct';
        if (option === selectedOption) return 'incorrect';
        return 'default';
    };

    return (
        <div className="game-container">
            <h3>{questionData.dados.legenda}</h3>
            <img src={`/assets/${questionData.dados.imagem}`} alt="Questão" className="game-image" />
            <div className="options-container">
                {questionData.dados.opcoes.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className={`option-button ${getButtonClass(option)}`}
                        disabled={isCorrect !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ImageChoiceGame;