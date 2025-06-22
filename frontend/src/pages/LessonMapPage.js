// frontend/src/pages/LessonMapPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LessonMapPage.css';

function LessonMapPage() {
    // CORREÇÃO: Usa 'languageId' para corresponder à rota definida no App.js
    const { languageId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers['x-auth-token'] = token;
            }

            try {
                // CORREÇÃO: Usa a variável 'languageId' para construir a URL da API
                const response = await fetch(`http://localhost:3001/api/lessons/${languageId}`, { headers });
                
                if (response.ok) {
                    const data = await response.json();
                    setLessons(data);
                } else {
                    console.error("Falha ao buscar lições:", response.statusText);
                    setLessons([]);
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [languageId]); // Dependência da busca agora é 'languageId'

    if (loading) {
        return (
            <div className="lesson-map-container">
                <h2>Carregando lições...</h2>
            </div>
        );
    }

    return (
        <div className="lesson-map-container">
            {/* O título agora capitaliza o ID do idioma para exibição */}
            <h2>Lições de {languageId.charAt(0).toUpperCase() + languageId.slice(1)}</h2>
            <div className="lessons-list">
                {lessons.length > 0 ? (
                    lessons.map(lesson => (
                        <div 
                            key={lesson.idLicao} 
                            className={`lesson-node ${lesson.status}`} 
                            onClick={() => lesson.status !== 'bloqueado' && navigate(`/lesson/${lesson.idLicao}`)}
                        >
                            <div className="lesson-icon"></div>
                            <span>{lesson.nome}</span>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma lição encontrada para este idioma.</p>
                )}
            </div>
        </div>
    );
}

export default LessonMapPage;