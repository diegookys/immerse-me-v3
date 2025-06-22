// backend/routes/users.js

const express = require('express');
const router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth.js');

const JWT_SECRET = 'seu_segredo_super_secreto_para_jwt';

// ROTA DE CADASTRO
router.post('/register', async (req, res) => {
    try {
        const { nomeUsuario, email, senha } = req.body;
        if (!nomeUsuario || !email || !senha) {
            return res.status(400).json({ message: "Por favor, preencha todos os campos." });
        }
        const sqlCheck = "SELECT * FROM Usuarios WHERE email = ?";
        db.get(sqlCheck, [email], async (err, row) => {
            if (row) return res.status(400).json({ message: "Este e-mail já está em uso." });

            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);
            const sqlInsert = 'INSERT INTO Usuarios (nomeUsuario, email, senha) VALUES (?,?,?)';

            db.run(sqlInsert, [nomeUsuario, email, senhaHash], function(err) {
                if (err) return res.status(500).json({ message: "Erro ao cadastrar usuário." });
                const newUserId = this.lastID;
                
                // Desbloqueia a primeira lição de cada idioma para o novo usuário
                const sqlFindLessons = "SELECT idLicao FROM Licoes WHERE ordem = 1";
                db.all(sqlFindLessons, [], (err, firstLessons) => {
                    if (err) return console.error("Erro ao buscar primeiras lições:", err);
                    const stmtUnlock = db.prepare("INSERT INTO ProgressoUsuario (idUsuario, idLicao, status) VALUES (?, ?, 'disponivel')");
                    firstLessons.forEach(lesson => stmtUnlock.run(newUserId, lesson.idLicao));
                    stmtUnlock.finalize();
                });
                res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId: newUserId });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Erro inesperado no servidor." });
    }
});

// ROTA DE LOGIN
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: "Por favor, preencha todos os campos." });
    const sql = "SELECT * FROM Usuarios WHERE email = ?";
    db.get(sql, [email], async (err, user) => {
        if (!user) return res.status(400).json({ message: "Credenciais inválidas." });
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas." });
        const payload = { user: { id: user.idUsuario, nome: user.nomeUsuario } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ message: "Login bem-sucedido!", token: token });
        });
    });
});

// ROTA DE PERFIL (GET)
router.get('/profile', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const sql = "SELECT idUsuario, nomeUsuario, email, paisOrigem, fotoPerfil, objetivo, interesse, nivelProficiencia, pontuacaoTotal FROM Usuarios WHERE idUsuario = ?";
    db.get(sql, [userId], (err, user) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" });
        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
        res.json(user);
    });
})

// ROTA DO PERFIL (PUT)

router.put('/profile', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { nomeUsuario, senha, fotoPerfil } = req.body;

    if(!nomeUsuario && !senha && !fotoPerfil){
        return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido." });
    }

    let fields = [];
    const params = [];

    if(nomeUsuario){
        fields.push('nomeUsuario = ?');
        params.push(nomeUsuario);
    }
    if(fotoPerfil){
        fields.push('fotoPerfil = ?');
        params.push(fotoPerfil);
    }
    if(senha){
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        fields.push('senha = ?');
        params.push(senhaHash);
    }
    
    const sql = `UPDATE Usuarios SET ${fields.join(', ')} WHERE idUsuario = ?`;
    params.push(userId);
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ message: "Erro ao atualizar perfil.", error: err.message });
        }
        res.json({ message: "Perfil atualizado com sucesso!" });
    });
});

module.exports = router;