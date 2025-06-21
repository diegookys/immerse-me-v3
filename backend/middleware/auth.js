// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu_segredo_super_secreto_para_jwt'; // Use o mesmo segredo do login

module.exports = function(req, res, next) {
    // Pega o token do header da requisição
    const token = req.header('x-auth-token');

    // Verifica se não há token
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    // Verifica se o token é válido
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Adiciona o payload do usuário ao objeto req
        next(); // Passa para a próxima função (a rota em si)
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};