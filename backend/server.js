// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./database.js');

// importar rotas
const userRoutes = require('./routes/users');
const lessonRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = 3001; // porta para o backend rodar

app.use(cors()); // frontend acessa a api
app.use(express.json());

// usar as rotas
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});