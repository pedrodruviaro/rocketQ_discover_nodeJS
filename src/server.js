const express = require("express");
const route = require("./route");
const path = require('path')

// iniciando express
const server = express();

// ejs config (config do motor de renderizacao)
server.set('view engine', 'ejs')

server.use(express.static("public"))  //pegando a pasta publico (de conteudo estatico)

server.set('views', path.join(__dirname, 'views'))  //redefinindo caminho da pasta views

// configurando middleware
server.use(express.urlencoded({extended: true}))

// usar arquivo 
server.use(route)

server.listen(3000, () => {
    console.log("Servidor rodou!!");
});
