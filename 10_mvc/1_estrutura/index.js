const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
// invocando o express
const app = express();
// configuracoes handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
// midleware que faz poder ler o que vem no corpo da requisicao
app.use(
  express.urlencoded({
    extended: true,
  })
);
// le em json
app.use(express.json());
// le as pastas staticas/css
app.use(express.static("public"));

// conecta a porta 3000
app.listen(3000);
