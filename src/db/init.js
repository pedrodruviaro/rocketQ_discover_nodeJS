//iniciando o banco de dados

const Database = require("./config");

//guardando as funcoes em initDb
const initDb = {
    async init() {
        const db = await Database();

        //codigos SQL
        //tabela das salas
        await db.exec(`
        CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        )`);

        // tabela das questoes
        await db.exec(`
        CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT,
            read INT,
            room INT
        )`);


        // fechando o db
        await db.close()
    },
};

initDb.init();
