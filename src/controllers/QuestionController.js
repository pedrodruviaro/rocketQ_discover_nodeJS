const Database = require('../db/config')

module.exports = {
    async index(req, res) {
        const db = await Database()

        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password; //name do form

        // verificar se a senha esta correta
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(verifyRoom.pass === password){
            if(action === "delete"){

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            } else if(action === "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }
        } else {
            //pagina de senha incorreta
            res.render('passincorret', { roomId: roomId })
        }

        res.redirect(`/room/${roomId}`)
    },

    //criando novas questoes
    async create(req, res){
        const db = await Database()

        //pegando informacoes
        const question = req.body.question
        const roomId = req.params.room


        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        ) VALUES (
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    }
};
