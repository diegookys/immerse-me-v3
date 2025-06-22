// backend/routes/progress.js (Versão Final com async/await)

const express = require('express');
const router = express.Router();
const db = require('../database.js');
const authMiddleware = require('../middleware/auth.js');
const util = require('util');

const dbRun = util.promisify(db.run.bind(db));
const dbGet = util.promisify(db.get.bind(db));
const dbAll = util.promisify(db.all.bind(db));

// ROTA PARA BUSCAR AS ESTATÍSTICAS DO USUÁRIO
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = `
            SELECT l.categoria, p.pontuacao
            FROM ProgressoUsuario p
            JOIN Licoes l ON p.idLicao = l.idLicao
            WHERE p.idUsuario = ? AND p.status = 'concluido'
        `;
        const rows = await dbAll(sql, [userId]);
        
        const totalLicoesConcluidas = rows.length;
        const melhorPontuacao = rows.reduce((max, row) => ((row.pontuacao || 0) > max ? row.pontuacao : max), 0);
        
        const progressoPorCategoria = rows.reduce((acc, row) => {
            if (row.categoria) acc[row.categoria] = (acc[row.categoria] || 0) + 1;
            return acc;
        }, {});

        res.json({ totalLicoesConcluidas, melhorPontuacao, progressoPorCategoria });
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar estatísticas." });
    }
});

// ROTA PARA FINALIZAR UMA LIÇÃO (LÓGICA CORRIGIDA COM ASYNC/AWAIT)
router.post('/complete', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, score } = req.body;

    if (!lessonId || score === undefined) {
        return res.status(400).json({ message: "ID da lição e pontuação são obrigatórios." });
    }

    try {
        // Inicia a transação
        await dbRun('BEGIN TRANSACTION;');

        // Passo 1: SEMPRE soma a nova pontuação à pontuação total do usuário
        const updateUserScoreSql = `UPDATE Usuarios SET pontuacaoTotal = pontuacaoTotal + ? WHERE idUsuario = ?`;
        await dbRun(updateUserScoreSql, [score, userId]);

        // Passo 2: Verificar a pontuação existente para esta lição para determinar o recorde
        const checkExistingSql = `SELECT pontuacao FROM ProgressoUsuario WHERE idUsuario = ? AND idLicao = ?`;
        const row = await dbGet(checkExistingSql, [userId, lessonId]);
        
        const existingScore = row ? row.pontuacao : 0;
        const newBestScore = Math.max(existingScore, score);

        // Passo 3: Inserir ou atualizar o progresso da lição com a MELHOR pontuação
        const upsertSql = `
            INSERT INTO ProgressoUsuario (idUsuario, idLicao, status, pontuacao)
            VALUES (?, ?, 'concluido', ?)
            ON CONFLICT(idUsuario, idLicao) DO UPDATE SET
            status = 'concluido',
            pontuacao = ?;
        `;
        await dbRun(upsertSql, [userId, lessonId, newBestScore, newBestScore]);

        // Passo 4: Se tudo deu certo, finalizar a transação
        await dbRun('COMMIT;');
        res.json({ message: "Progresso salvo com sucesso!" });

    } catch (err) {
        // Se qualquer passo falhar, desfaz a transação
        await dbRun('ROLLBACK;');
        console.error("Erro ao salvar progresso, transação desfeita:", err.message);
        res.status(500).json({ message: "Erro ao salvar progresso." });
    }
});

module.exports = router;