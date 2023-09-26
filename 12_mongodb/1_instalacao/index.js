const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// configuracoes handlebars/template engine "express-handlebars": "^5.3.3",
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// conexao ao BD
const conn = require("./db/conn").run;

// estrutura para ler o body, post/ ler json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// server
app.listen(3000);
