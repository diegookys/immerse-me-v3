// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // Vamos criar este arquivo a seguir

// Importar rotas
const userRoutes = require('./routes/users');
const lessonRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = 3001; // Porta para o backend rodar

app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda JSON

// Usar as rotas
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});