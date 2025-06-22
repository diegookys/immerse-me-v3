// frontend/src/pages/DashboardPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import './DashboardPage.css';

// --- RECOMPENSAS ---
const rewards = [
    { level: 'Novato', points: 0, icon: 'novato.png' },
    { level: 'Aprendiz', points: 100, icon: 'aprendiz.png' },
    { level: 'Explorador', points: 250, icon: 'explorador.png' },
    { level: 'Comunicador', points: 500, icon: 'comunicador.png' },
    { level: 'Mestre', points: 1000, icon: 'mestre.png' },
    { level: 'Poliglota', points: 2000, icon: 'poliglota.png' },
];

function RewardsSection({ user, onProfileUpdate }) {
    const handleSetAvatar = async (iconName) => {
        if (!window.confirm(`Deseja definir "${iconName}" como sua nova foto de perfil?`)) {
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const fullIconPath = `rewards/${iconName}`;
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ fotoPerfil: fullIconPath }),
            });
            if (response.ok) {
                alert('Foto de perfil atualizada!');
                onProfileUpdate();
            } else {
                alert('Não foi possível atualizar a foto.');
            }
        } catch (error) {
            console.error("Erro ao atualizar foto de perfil:", error);
        }
    };
    return (
        <div className="info-card">
            <h3>Recompensas de Nível</h3>
            <div className="rewards-grid">
                {rewards.map(reward => {
                    const isUnlocked = user.pontuacaoTotal >= reward.points;
                    return (
                        <div key={reward.level} className={`reward-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                             onClick={() => isUnlocked && handleSetAvatar(reward.icon)}>
                            <img src={`/assets/rewards/${reward.icon}`} alt={reward.level} />
                            <span>{reward.level}</span>
                            {!isUnlocked && <small>({reward.points} pts)</small>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchUserProfile = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/api/users/profile', {
                headers: { 'x-auth-token': token },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (err) {
            console.error("Erro ao carregar perfil:", err);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div className="dashboard-container"><p>Carregando perfil...</p></div>;
    if (!user) return null;
    
    return (
        <>
            <div className="dashboard-container">
                <div className="profile-card">
                    {/* ===== chamada de video ===== */}
                    {/* botao para iniciar a chamada de video */}
                    <button 
                        className="video-call-button" 
                        title="Iniciar Chamada de Vídeo" 
                        onClick={() => navigate('/videocall')}
                    >
                        🎥
                    </button>
                    {/* ===== cabosi ===== */}
                    
                    <img src={`/assets/${user.fotoPerfil || 'rewards/novato.png'}`} alt="Foto do Perfil" className="profile-picture" />
                    <h2>{user.nomeUsuario}</h2>
                    <p className="total-score">Pontuação Total: {user.pontuacaoTotal || 0}</p>
                    <button className="edit-button" onClick={() => setIsModalOpen(true)}>Editar Perfil</button>
                </div>
                
                <button className="start-learning-button" onClick={() => navigate('/language-selection')}>
                    Voltar para as Lições
                </button>

                <RewardsSection user={user} onProfileUpdate={fetchUserProfile} />

                <div className="info-card">
                    <h3>Dados de Uso</h3>
                    <div className="settings-item">
                        <span>Notificações</span>
                        <button className="settings-button">Gerenciar</button>
                    </div>
                    <div className="settings-item">
                        <span>Meu Progresso</span>
                        <button className="settings-button" onClick={() => navigate('/progress')}>Visualizar</button>
                    </div>
                </div>
                
                <button onClick={handleLogout} className="logout-button">Sair (Logout)</button>
            </div>

            {isModalOpen && (
                <EditProfileModal 
                    user={user} 
                    onClose={() => setIsModalOpen(false)}
                    onProfileUpdate={fetchUserProfile}
                />
            )}
        </>
    );
}

export default DashboardPage;