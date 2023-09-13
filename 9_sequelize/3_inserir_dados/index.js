const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./models/User");

const app = express();

// para poder pegar o body e ja em json, para fazer post
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// setando as handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// setando pasta public para o css
app.use(express.static("public"));

// rota para criar usuarios
app.get("/users/create", (req, res) => {
  res.render("adduser");
});

// rota post para enviar ao bd os dados
// utilizamos o await e o async para antes de redirecionar, ele esperar os dados serem enviado
app.post("/users/create", async (req, res) => {
  // resgatamos os dados pelo body, que vieram do form
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter; // se estiver checkada vem com valor de 'on'

  // verifica se esta como on, e muda para true, caso esteja desmarcada como false
  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  // Enviando os dados para o BD( criando o usuario), utilizando o sequelize
  // lembrando de inserir na ordem da tabela
  // utilizamos o await e o async para antes de redirecionar, ele esperar os dados serem enviado
  await User.create({
    name,
    occupation,
    newsletter,
  });

  // redireciona para home
  res.redirect("/");
});

// pagina principal
app.get("/", (req, res) => {
  res.render("home");
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
