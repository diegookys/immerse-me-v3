// backend/routes/lessons.js

const express = require('express');
const router = express.Router();
const db = require('../database.js');
const authMiddleware = require('../middleware/auth.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu_segredo_super_secreto_para_jwt';

const languageMap = {
    'japones': 'Japonês', 'ingles': 'Inglês',
    'chines': 'Chinês', 'coreano': 'Coreano'
};

const getPublicLessons = (languageName, res) => {
    const sql = `SELECT idLicao, nome, ordem, 'disponivel' as status FROM Licoes WHERE idioma LIKE ? ORDER BY ordem`;
    db.all(sql, [languageName], (err, rows) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" });
        res.json(rows);
    });
};

// listar licoes
router.get('/:languageId', (req, res) => {
    const { languageId } = req.params;
    const languageName = languageMap[languageId.toLowerCase()];
    if (!languageName) return res.status(404).json({ message: "Idioma não encontrado." });
    
    const token = req.header('x-auth-token');

    if(!token){
        return getPublicLessons(languageName, res);
    }
    
    try{
        jwt.verify(token, JWT_SECRET);
        return getPublicLessons(languageName, res);
    } catch (err){
        return getPublicLessons(languageName, res);
    }
});

// BUSCAR AS PERGUNTAS DE UMA ATIVIDADE ESPECIFICA
router.get('/questions/:lessonId', (req, res) => {
    const { lessonId } = req.params;
    if (!lessonId || isNaN(lessonId)) {
        return res.status(400).json({ message: "ID da lição é inválido." });
    }
    const sql = "SELECT idPergunta, tipoPergunta, dadosPergunta FROM Perguntas WHERE idLicao = ?";
    db.all(sql, [lessonId], (err, rows) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" });
        const questions = rows.map(q => ({...q, dados: JSON.parse(q.dadosPergunta)}));
        res.json(questions);
    });
});

module.exports = router;