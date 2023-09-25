const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const Task = require("./models/Task");

const tasksRoutes = require("./routes/tasksRoutes");

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

// usando a /tasks que estão em tasksRoutes, ou seja se for /tasks
// ele acessa o tasksRoutes
app.use("/tasks", tasksRoutes);

// conecta a porta 3000 e sincroniza com os models do bd
conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
