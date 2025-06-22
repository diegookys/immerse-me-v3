// frontend/src/components/EditProfileModal.js

import React, { useState } from 'react';
import './EditProfileModal.css';

function EditProfileModal({ user, onClose, onProfileUpdate }) {
    const [nomeUsuario, setNomeUsuario] = useState(user.nomeUsuario);
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Cria o corpo da requisição apenas com os campos que foram alterados
        const body = {};
        if (nomeUsuario !== user.nomeUsuario) {
            body.nomeUsuario = nomeUsuario;
        }
        if (senha) {
            body.senha = senha;
        }

        if (Object.keys(body).length === 0) {
            setMessage("Nenhuma alteração para salvar.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Perfil atualizado com sucesso!");
                onProfileUpdate(); // Avisa o Dashboard para recarregar os dados
                setTimeout(onClose, 1500); // Fecha o modal após 1.5s
            } else {
                setMessage(data.message || "Erro ao atualizar.");
            }
        } catch (error) {
            setMessage("Erro de conexão com o servidor.");
        }
    };
    
    // Upload de foto é uma funcionalidade avançada. Por enquanto, focamos nos outros campos.
    // const handlePhotoChange = (e) => { ... };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome de Usuário</label>
                        <input
                            type="text"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Nova Senha (deixe em branco para não alterar)</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Foto de Perfil</label>
                        <input type="file" disabled />
                        <small>(Funcionalidade de upload em desenvolvimento)</small>
                    </div>
                    <button type="submit" className="form-button">Salvar Alterações</button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;