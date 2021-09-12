const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();

        //password vindo do form
        const pass = req.body.password;

        //gerando codigo de sala
        let roomId = 0;
        let isRoom = true;

        while (isRoom) {
            for (let i = 0; i < 6; i++) {
                i === 0
                    ? (roomId = Math.floor(Math.random() * 10).toString())
                    : (roomId += Math.floor(Math.random() * 10).toString());
            }

            //verificar se esse numero ja existe
            const roomExistIds = await db.all(`SELECT id FROM rooms`); //retorna => db.all

            isRoom = roomExistIds.some((roomExistId) => roomExistId === roomId); //retorna o primeiro valor que retornar true
        }

        if (!isRoom) {
            // inserindo a sala no banco
            await db.run(`INSERT INTO rooms (
                id,
                pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass} 
                    )`);
        }

        await db.close();

        //redirecionando usuario
        res.redirect(`/room/${roomId}`);
    },

    // abre sala
    async open(req, res){
        //AQUI EH ONDE ABRE A SALA, portanto, deve buscar as perguntas
        const db = await Database();

        const roomId = req.params.room
        
        //perguntas nao lidas
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)

        //perguntas lidas
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        

        //verificando se tem questoes
        let isNoQuestion;

        if(questions.length === 0){
            if(questionsRead.length === 0){
                isNoQuestion = true
            }
        }

        res.render("room", { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestion: isNoQuestion })   //passando variavel para utilizar na pagina room
    },


    // entrando em uma sala
    enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
};
