-- backend/schema.sql

-- tabela para guardar informacoes dos usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeUsuario VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    paisOrigem VARCHAR(45),
    fotoPerfil VARCHAR(255) DEFAULT 'default_avatar.png',
    objetivo VARCHAR(50),
    interesse VARCHAR(50),
    nivelProficiencia VARCHAR(50)
);

-- tabela para licoes
CREATE TABLE IF NOT EXISTS Licoes (
    idLicao INTEGER PRIMARY KEY AUTOINCREMENT,
    idioma VARCHAR(45) NOT NULL,
    nome TEXT NOT NULL,
    ordem INTEGER,
    tipo VARCHAR(50),
    categoria VARCHAR(50)
);

-- tabela para guardar o progresso dos usuarios nas licoes
CREATE TABLE IF NOT EXISTS ProgressoUsuario (
    idProgresso INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER NOT NULL,
    idLicao INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'bloqueado', -- 'bloqueado', 'disponivel', 'concluido'
    pontuacao INTEGER DEFAULT 0,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idLicao) REFERENCES Licoes (idLicao) ON DELETE CASCADE
);

-- tabela para as perguntas dos minijogos (exemplo)
CREATE TABLE IF NOT EXISTS Perguntas (
    idPergunta INTEGER PRIMARY KEY AUTOINCREMENT,
    idLicao INTEGER NOT NULL,
    tipoPergunta VARCHAR(50),
    dadosPergunta TEXT,
    FOREIGN KEY (idLicao) REFERENCES Licoes (idLicao) ON DELETE CASCADE
);