// frontend/src/components/ImageChoiceGame.js

import React, { useState, useEffect } from 'react';
import './ImageChoiceGame.css';

function ImageChoiceGame({ questionData, onComplete }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
    }, [questionData]);


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