// frontend/src/pages/VideoCallPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoCallPage.css';

function VideoCallPage() {
    const navigate = useNavigate();
    
    // Gera um nome de sala aleatório para cada nova chamada
    const roomName = `ImmerseMeCall-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className="videocall-container">
            <div className="videocall-header">
                <h2>Sala de Conversação</h2>
                <button className="leave-call-button" onClick={() => navigate(-1)}>
                    Sair da Chamada e Voltar
                </button>
            </div>
            <div className="jitsi-container">
                <iframe
                    allow="camera; microphone"
                    src={`https://meet.jit.si/${roomName}`}
                    style={{ height: '100%', width: '100%', border: 0 }}
                    title="Immerse Me Video Call"
                ></iframe>
            </div>
        </div>
    );
}

export default VideoCallPage;