// frontend/src/pages/ProgressPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ProgressPage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProgressPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3001/api/progress/stats', {
                    headers: { 'x-auth-token': token }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="progress-container"><p>Carregando estatísticas...</p></div>;
    if (!stats) return <div className="progress-container"><p>Não foi possível carregar suas estatísticas.</p></div>;

    const chartData = {
        labels: Object.keys(stats.progressoPorCategoria),
        datasets: [{
            data: Object.values(stats.progressoPorCategoria),
            backgroundColor: ['#8338ec', '#ffbe0b', '#fb5607', '#ff006e', '#3a86ff'],
            hoverOffset: 4
        }]
    };

    return (
        <div className="progress-container">
            <h1>Meu Progresso</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h2>{stats.totalLicoesConcluidas}</h2>
                    <p>Lições Concluídas</p>
                </div>
                <div className="stat-card">
                    <h2>{stats.melhorPontuacao}</h2>
                    <p>Melhor Pontuação</p>
                </div>
            </div>

            <div className="chart-container">
                <h3>Progresso por Categoria</h3>
                {Object.keys(stats.progressoPorCategoria).length > 0 ? (
                    <Doughnut data={chartData} />
                ) : (
                    <p>Complete lições para ver seu progresso aqui!</p>
                )}
            </div>

            <button className="back-button" onClick={() => navigate('/dashboard')}>Voltar para o Perfil</button>
        </div>
    );
}

export default ProgressPage;