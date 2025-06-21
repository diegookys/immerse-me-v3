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

router.get('/:languageId', (req, res) => {
    const { languageId } = req.params;
    const languageName = languageMap[languageId.toLowerCase()];
    if (!languageName) return res.status(404).json({ message: "Idioma não encontrado." });
    
    console.log(`Buscando lições para: ${languageName}`);
    const token = req.header('x-auth-token');

    if (token) {
        // Lógica para usuário logado (continua a mesma)
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.user.id;
            const sql = `SELECT idLicao, nome, ordem, 'disponivel' as status FROM Licoes WHERE idioma LIKE ? ORDER BY ordem`;
            db.all(sql, [languageName], (err, rows) => {
                if(err)return res.status(500).json({ message: "Erro no servidor" });
                res.json(rows);
            });
        } catch (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
    } else {
        // LÓGICA CORRIGIDA PARA VISITANTES
        const sql = `SELECT idLicao, nome, ordem FROM Licoes WHERE idioma LIKE ? ORDER BY ordem`;
        db.all(sql, [languageName], (err, rows) => {
            if (err) return res.status(500).json({ message: "Erro no servidor" });
            
            // Marca a primeira lição como disponível e o resto como bloqueado
            const lessonsWithStatus = rows.map(lesson => ({
                ...lesson,
                status: lesson.ordem === 1 ? 'disponivel' : 'bloqueado'
            }));
            res.json(lessonsWithStatus);
        });
    }
});

// ... (o restante do arquivo continua o mesmo)
router.get('/questions/:lessonId', authMiddleware, (req, res) => {
    const { lessonId } = req.params;
    if (!lessonId || lessonId === 'undefined') {
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