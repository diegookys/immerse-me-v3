// frontend/src/pages/LessonPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageChoiceGame from '../components/ImageChoiceGame';
import FillInTheBlankGame from '../components/FillInTheBlankGame';

function LessonPage() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!lessonId) { setLoading(false); return; }
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/lessons/questions/${lessonId}`);
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [lessonId]);

    const handleComplete = async (isCorrect) => {
        // calcula a pontuação final da lição
        const finalScore = isCorrect ? score + 10 : score;

        // verifica se é a última questão
        if (currentIndex >= questions.length - 1) {
            const token = localStorage.getItem('token');
            
            // tenta salvar o progresso se o usuário estiver logado
            if (token) {
                try {
                    await fetch('http://localhost:3001/api/progress/complete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token,
                        },
                        body: JSON.stringify({ lessonId: lessonId, score: finalScore }),
                    });
                } catch (error) {
                    console.error("Não foi possível salvar o progresso:", error);
                }
            }
            
            navigate(`/lesson-results/${finalScore}`);
        } else{
            if(isCorrect){
                setScore(finalScore);
            }
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (loading) return <p>Carregando Questões...</p>;
    if (questions.length === 0) return <p>Nenhuma questão encontrada para esta lição.</p>;
    
    const currentQuestion = questions[currentIndex];
    
    const renderGameComponent = () => {
        switch (currentQuestion.tipoPergunta) {
            case 'imagem_texto':
                return <ImageChoiceGame questionData={currentQuestion} onComplete={handleComplete} />;
            case 'preencher_lacuna':
                return <FillInTheBlankGame questionData={currentQuestion} onComplete={handleComplete} />;
            default:
                return <p>Tipo de questão não suportado.</p>;
        }
    };

    return (
        <div>
            <div style={{width: `${((currentIndex + 1) / questions.length) * 100}%`, height: '10px', backgroundColor: 'var(--correct-green)', transition: 'width 0.5s ease-in-out'}}></div>
            {renderGameComponent()}
        </div>
    );
}

export default LessonPage;