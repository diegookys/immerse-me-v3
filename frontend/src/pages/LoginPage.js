// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        // Verifique se o servidor backend está rodando no seu terminal!
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Salva o token no localStorage para manter o usuário logado
                localStorage.setItem('token', data.token);
                setMessage('Login bem-sucedido! Redirecionando...');
                
                // A lógica de onboarding foi movida para o Dashboard.
                // Apenas redireciona para o dashboard.
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                setMessage(data.message || 'Erro no login.');
            }
        } catch (error) {
            // Este erro geralmente significa que o servidor backend não está rodando.
            console.error("Erro de conexão:", error);
            setMessage('Não foi possível conectar ao servidor.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>Bem-vindo de volta!</h2>
                <p>Faça login para continuar sua jornada.</p>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="form-button">Entrar</button>
                </form>
                {message && <p className="message">{message}</p>}
                 <p className="form-link" onClick={() => navigate('/register')}>
                    Não tem uma conta? Cadastre-se
                </p>
            </div>
        </div>
    );
}

export default LoginPage;