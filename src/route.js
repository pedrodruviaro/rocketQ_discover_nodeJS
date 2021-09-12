const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController")
const route = express.Router();

// rota home
route.get("/", (req, res) => res.render("index", { page: "enter-room" }));

//rota createpass
route.get("/create-pass", (req, res) => res.render("index", { page: "create-pass" }));

//rotas room
route.post("/create-room", RoomController.create)
route.get("/room/:room", RoomController.open);
route.post('/enter-room', RoomController.enter)

// formato que o form da modal deve passar a informacao
/* exemplo =>  /room/216357/2/check
 */

//questions
route.post("/question/create/:room", QuestionController.create)
route.post("/question/:room/:question/:action", QuestionController.index);



module.exports = route;
