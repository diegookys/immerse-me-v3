const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const SECRET = 'chave_secreta_simples';

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Email já cadastrado.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/profile', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    res.json(user);
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get('/api/live', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  try {
    const token = auth.split(' ')[1];
    jwt.verify(token, SECRET);
    const roomId = `immerse-room-${Math.random().toString(36).substring(7)}`;
    res.json({ roomUrl: `https://meet.jit.si/${roomId}` });
  } catch (err) {
    res.sendStatus(401);
  }
});

app.post('/api/progress', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const { points } = req.body;
    const progress = await prisma.progress.upsert({
      where: { userId: decoded.id },
      update: { points: { increment: points } },
      create: { userId: decoded.id, points },
    });
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar progresso' });
  }
});

app.get('/api/ranking', async (req, res) => {
  const ranking = await prisma.progress.findMany({
    include: { user: true },
    orderBy: { points: 'desc' },
    take: 10,
  });
  res.json(ranking);
});

app.listen(4000, () => console.log('Backend rodando na porta 4000'));