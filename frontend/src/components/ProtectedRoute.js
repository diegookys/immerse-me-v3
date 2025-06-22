// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // Se não houver token, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    // Se houver token, renderiza a página solicitada
    return children;
}

export default ProtectedRoute;