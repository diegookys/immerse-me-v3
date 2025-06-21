// backend/seed.js (Versão Final com Conteúdo Expandido)

const db = require('./database.js');

const licoes = [
    // Japonês
    { idioma: 'Japonês', nome: 'Animais', ordem: 1, tipo: 'imagem_texto', categoria: 'Vocabulário' },
    { idioma: 'Japonês', nome: 'Comidas', ordem: 2, tipo: 'preencher_lacuna', categoria: 'Vocabulário' },
    { idioma: 'Japonês', nome: 'Viagem', ordem: 3, tipo: 'imagem_texto', categoria: 'Conversação' },
    // Inglês
    { idioma: 'Inglês', nome: 'Animais', ordem: 1, tipo: 'imagem_texto', categoria: 'Vocabulário' },
    { idioma: 'Inglês', nome: 'Comidas', ordem: 2, tipo: 'preencher_lacuna', categoria: 'Vocabulário' },
    { idioma: 'Inglês', nome: 'Viagem', ordem: 3, tipo: 'imagem_texto', categoria: 'Conversação' },
    // Coreano
    { idioma: 'Coreano', nome: 'Animais', ordem: 1, tipo: 'imagem_texto', categoria: 'Vocabulário' },
    { idioma: 'Coreano', nome: 'Comidas', ordem: 2, tipo: 'preencher_lacuna', categoria: 'Vocabulário' },
    { idioma: 'Coreano', nome: 'Viagem', ordem: 3, tipo: 'imagem_texto', categoria: 'Conversação' },
    // Chinês
    { idioma: 'Chinês', nome: 'Animais', ordem: 1, tipo: 'imagem_texto', categoria: 'Vocabulário' },
    { idioma: 'Chinês', nome: 'Comidas', ordem: 2, tipo: 'preencher_lacuna', categoria: 'Vocabulário' },
    { idioma: 'Chinês', nome: 'Viagem', ordem: 3, tipo: 'imagem_texto', categoria: 'Conversação' },
];

const perguntas = [
    // Lição 1: Japonês - Animais
    { idLicao: 1, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "cat.png", legenda: "Qual é este?", opcoes: ["猫 (neko)", "犬 (inu)", "鳥 (tori)"], respostaCorreta: "猫 (neko)" })},
    { idLicao: 1, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "dog.png", legenda: "Qual é este?", opcoes: ["魚 (sakana)", "犬 (inu)", "熊 (kuma)"], respostaCorreta: "犬 (inu)" })},
    { idLicao: 1, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "horse.png", legenda: "Qual é este?", opcoes: ["馬 (uma)", "虎 (tora)", "象 (zō)"], respostaCorreta: "馬 (uma)" })},
    // Lição 2: Japonês - Comidas
    { idLicao: 2, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["私は", null, "が好きです。"], opcoes: ["寿司 (sushi)", "家 (ie)", "車 (kuruma)"], respostaCorreta: "寿司 (sushi)" })},
    { idLicao: 2, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["これは美味しい", null, "です。"], opcoes: ["ラーメン (rāmen)", "木 (ki)", "犬 (inu)"], respostaCorreta: "ラーメン (rāmen)" })},
    { idLicao: 2, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["天ぷらを", null, "。"], opcoes: ["食べます (tabemasu)", "見ます (mimasu)", "行きます (ikimasu)"], respostaCorreta: "食べます (tabemasu)" })},
    // Lição 3: Japonês - Viagem
    { idLicao: 3, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "ticket.png", legenda: "Isto é um...", opcoes: ["切符 (kippu)", "旅券 (ryoken)", "財布 (saifu)"], respostaCorreta: "切符 (kippu)" })},
    { idLicao: 3, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "passport.png", legenda: "Isto é um...", opcoes: ["お金 (okane)", "旅券 (ryoken)", "荷物 (nimotsu)"], respostaCorreta: "旅券 (ryoken)" })},
    { idLicao: 3, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "suitcase.png", legenda: "Isto é uma...", opcoes: ["クレジットカード (kurejittokādo)", "財布 (saifu)", "荷物 (nimotsu)"], respostaCorreta: "荷物 (nimotsu)" })},
    
    // Lição 4: Inglês - Animais
    { idLicao: 4, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "lion.png", legenda: "Which animal is this?", opcoes: ["Lion", "Tiger", "Bear"], respostaCorreta: "Lion" })},
    { idLicao: 4, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "elephant.png", legenda: "Which animal is this?", opcoes: ["Horse", "Elephant", "Dog"], respostaCorreta: "Elephant" })},
    { idLicao: 4, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "bear.png", legenda: "Which animal is this?", opcoes: ["Cat", "Lion", "Bear"], respostaCorreta: "Bear" })},
    // Lição 5: Inglês - Comidas
    { idLicao: 5, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["I would like to eat", null, "."], opcoes: ["sushi", "a car", "a passport"], respostaCorreta: "sushi" })},
    { idLicao: 5, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["This", null, "is delicious."], opcoes: ["ramen", "tree", "money"], respostaCorreta: "ramen" })},
    { idLicao: 5, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["My favorite food is", null, "."], opcoes: ["tempura", "a wallet", "a ticket"], respostaCorreta: "tempura" })},
    // Lição 6: Inglês - Viagem
    { idLicao: 6, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "money.png", legenda: "What is this?", opcoes: ["Credit Card", "Money", "Wallet"], respostaCorreta: "Money" })},
    { idLicao: 6, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "credit-card.png", legenda: "What is this?", opcoes: ["Passport", "Ticket", "Credit Card"], respostaCorreta: "Credit Card" })},
    { idLicao: 6, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "wallet.png", legenda: "What is this?", opcoes: ["Wallet", "Suitcase", "Money"], respostaCorreta: "Wallet" })},
    
    // ... e assim por diante para Coreano e Chinês...
    // Lição 7: Coreano - Animais
    { idLicao: 7, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "cat.png", legenda: "이 동물은 무엇입니까?", opcoes: ["고양이 (goyangi)", "개 (gae)", "새 (sae)"], respostaCorreta: "고양이 (goyangi)" })},
    { idLicao: 7, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "dog.png", legenda: "이 동물은 무엇입니까?", opcoes: ["물고기 (mulgogi)", "개 (gae)", "곰 (gom)"], respostaCorreta: "개 (gae)" })},
    { idLicao: 7, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "bird.png", legenda: "이 동물은 무엇입니까?", opcoes: ["말 (mal)", "새 (sae)", "호랑이 (horangi)"], respostaCorreta: "새 (sae)" })},
    // Lição 8: Coreano - Comidas
    { idLicao: 8, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["나는", null, "를 먹고 싶어요."], opcoes: ["라면 (ramyeon)", "집 (jib)", "돈 (don)"], respostaCorreta: "라면 (ramyeon)" })},
    { idLicao: 8, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["이", null, "는 맛있어요."], opcoes: ["김치 (kimchi)", "나무 (namu)", "여권 (yeogwon)"], respostaCorreta: "김치 (kimchi)" })},
    { idLicao: 8, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["저는", null, "를 좋아해요."], opcoes: ["스시 (seusi)", "지갑 (jigab)", "차 (cha)"], respostaCorreta: "스시 (seusi)" })},
    
    // Lição 10: Chinês - Animais
    { idLicao: 10, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "tiger.png", legenda: "这是什么动物？", opcoes: ["老虎 (lǎohǔ)", "狮子 (shīzi)", "大象 (dàxiàng)"], respostaCorreta: "老虎 (lǎohǔ)" })},
    { idLicao: 10, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "lion.png", legenda: "这是什么动物？", opcoes: ["熊 (xióng)", "狮子 (shīzi)", "马 (mǎ)"], respostaCorreta: "狮子 (shīzi)" })},
    { idLicao: 10, tipoPergunta: 'imagem_texto', dadosPergunta: JSON.stringify({ imagem: "fish.png", legenda: "这是什么动物？", opcoes: ["鱼 (yú)", "鸟 (niǎo)", "猫 (māo)"], respostaCorreta: "鱼 (yú)" })},
    // Lição 11: Chinês - Comidas
    { idLicao: 11, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["我想吃", null, "。"], opcoes: ["米饭 (mǐfàn)", "房子 (fángzi)", "护照 (hùzhào)"], respostaCorreta: "米饭 (mǐfàn)" })},
    { idLicao: 11, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["这个", null, "很好吃。"], opcoes: ["天妇罗 (tiānfùluó)", "钱包 (qiánbāo)", "行李箱 (xínglixiāng)"], respostaCorreta: "天妇罗 (tiānfùluó)" })},
    { idLicao: 11, tipoPergunta: 'preencher_lacuna', dadosPergunta: JSON.stringify({ frase: ["我喜欢", null, "面。"], opcoes: ["拉 (lā)", "信用卡 (xìnyòngkǎ)", "票 (piào)"], respostaCorreta: "拉 (lā)" })},
];


// --- LÓGICA PARA RECRIAR E POPULAR O BANCO DE DADOS ---
db.serialize(() => {
    console.log('Iniciando a recriação do banco de dados...');
    db.run('BEGIN TRANSACTION;');
    const tablesToDrop = ['ProgressoUsuario', 'Perguntas', 'Licoes', 'Usuarios'];
    tablesToDrop.forEach(table => db.run(`DROP TABLE IF EXISTS ${table}`));
    console.log('Tabelas antigas apagadas.');
    const schema = `
        CREATE TABLE Usuarios (idUsuario INTEGER PRIMARY KEY, nomeUsuario TEXT, email TEXT UNIQUE, senha TEXT, paisOrigem TEXT, fotoPerfil TEXT, objetivo TEXT, interesse TEXT, nivelProficiencia TEXT);
        CREATE TABLE Licoes (idLicao INTEGER PRIMARY KEY, idioma TEXT NOT NULL, nome TEXT NOT NULL, ordem INTEGER, tipo TEXT, categoria TEXT);
        CREATE TABLE Perguntas (idPergunta INTEGER PRIMARY KEY, idLicao INTEGER, tipoPergunta TEXT, dadosPergunta TEXT, FOREIGN KEY (idLicao) REFERENCES Licoes (idLicao) ON DELETE CASCADE);
        CREATE TABLE ProgressoUsuario (idProgresso INTEGER PRIMARY KEY, idUsuario INTEGER, idLicao INTEGER, status TEXT, pontuacao INTEGER, FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE, FOREIGN KEY (idLicao) REFERENCES Licoes(idLicao) ON DELETE CASCADE, UNIQUE(idUsuario, idLicao));
    `;
    db.exec(schema, (err) => {
        if (err) {
            console.error("ERRO CRÍTICO AO RECRIAR TABELAS:", err.message);
            db.run('ROLLBACK');
            return;
        }
        console.log('Tabelas recriadas. Populando com dados...');
        const stmtLicoes = db.prepare("INSERT INTO Licoes (idioma, nome, ordem, tipo, categoria) VALUES (?, ?, ?, ?, ?)");
        licoes.forEach(licao => stmtLicoes.run(licao.idioma, licao.nome, licao.ordem, licao.tipo, licao.categoria));
        stmtLicoes.finalize();
        console.log('Tabela Licoes populada.');
        const stmtPerguntas = db.prepare("INSERT INTO Perguntas (idLicao, tipoPergunta, dadosPergunta) VALUES (?, ?, ?)");
        perguntas.forEach(pergunta => stmtPerguntas.run(pergunta.idLicao, pergunta.tipoPergunta, pergunta.dadosPergunta));
        stmtPerguntas.finalize();
        console.log('Tabela Perguntas populada.');
        db.run('COMMIT;', (err) => {
            if (err) console.error("Erro ao finalizar transação:", err.message);
            else console.log('Banco de dados recriado e populado com sucesso!');
        });
    });
});