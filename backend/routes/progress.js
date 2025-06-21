// backend/routes/progress.js

const express = require('express');
const router = express.Router();
const db = require('../database.js');
const authMiddleware = require('../middleware/auth.js');

// ROTA PARA FINALIZAR UMA LIÇÃO, SALVAR PONTOS E DESBLOQUEAR A PRÓXIMA
// POST /api/progress/complete
router.post('/complete', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const { lessonId, score } = req.body;

    if (!lessonId || score === undefined) {
        return res.status(400).json({ message: "ID da lição e pontuação são obrigatórios." });
    }

    db.serialize(() => {
        // Inicia uma transação para garantir que todas as operações ocorram juntas
        db.run('BEGIN TRANSACTION');

        // 1. Atualiza ou insere o progresso da lição atual
        const upsertSql = `
            INSERT INTO ProgressoUsuario (idUsuario, idLicao, status, pontuacao)
            VALUES (?, ?, 'concluido', ?)
            ON CONFLICT(idUsuario, idLicao) DO UPDATE SET
            status = 'concluido',
            pontuacao = CASE WHEN pontuacao < excluded.pontuacao THEN excluded.pontuacao ELSE pontuacao END;
        `;
        db.run(upsertSql, [userId, lessonId, score], (err) => {
            if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ message: "Erro ao salvar progresso.", error: err.message });
            }
        });

        // 2. Encontra a próxima lição e a desbloqueia
        const findNextLessonSql = `
            SELECT idLicao, idioma, ordem FROM Licoes WHERE idLicao = ?
        `;
        db.get(findNextLessonSql, [lessonId], (err, currentLesson) => {
            if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ message: "Erro ao encontrar lição atual.", error: err.message });
            }

            if (currentLesson) {
                const nextLessonOrder = currentLesson.ordem + 1;
                const unlockSql = `
                    INSERT INTO ProgressoUsuario (idUsuario, idLicao, status, pontuacao)
                    SELECT ?, l.idLicao, 'disponivel', 0
                    FROM Licoes l
                    WHERE l.idioma = ? AND l.ordem = ?
                    ON CONFLICT(idUsuario, idLicao) DO NOTHING;
                `;
                db.run(unlockSql, [userId, currentLesson.idioma, nextLessonOrder], (err) => {
                     if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ message: "Erro ao desbloquear próxima lição.", error: err.message });
                    }
                    // Finaliza a transação com sucesso
                    db.run('COMMIT');
                    res.json({ message: "Progresso salvo com sucesso!" });
                });
            } else {
                 // Finaliza a transação mesmo se não houver próxima lição
                db.run('COMMIT');
                res.json({ message: "Progresso salvo! Nenhuma lição seguinte para desbloquear." });
            }
        });
    });
});

module.exports = router;