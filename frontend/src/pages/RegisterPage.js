// frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // Um arquivo CSS para estilizar os formulários

function RegisterPage() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomeUsuario, email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
                setTimeout(() => {
                    navigate('/login'); // Redireciona para a página de login após o sucesso
                }, 2000);
            } else {
                setMessage(data.message || 'Ocorreu um erro.');
            }
        } catch (error) {
            setMessage('Não foi possível conectar ao servidor.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>Crie sua Conta</h2>
                <p>Junte-se ao Immerse Me e comece a aprender!</p>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">Cadastrar</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="form-link" onClick={() => navigate('/login')}>
                    Já tem uma conta? Faça login
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;