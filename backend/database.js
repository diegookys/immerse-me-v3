// backend/database.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path'); // 1. Importe o módulo 'path' do Node.js

const DBSOURCE = "immerse_me.db";

// 2. Use path.join e __dirname para criar o caminho correto e absoluto para o schema.sql
const schemaPath = path.join(__dirname, 'schema.sql'); 
const schema = fs.readFileSync(schemaPath).toString();

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Não foi possível conectar ao banco de dados
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.exec(schema, (err) => {
            if (err) {
                // Erro ao criar as tabelas
                console.error("Erro ao criar tabelas: ", err);
            } else {
                console.log("Tabelas criadas ou já existentes.");
            }
        });
    }
});

module.exports = db;