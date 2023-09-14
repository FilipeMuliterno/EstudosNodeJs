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

// pagina unica para cada usuario
app.get("/users/:id", async (req, res) => {
  // recupera o id passado na url
  const id = req.params.id;

  // ele faz o fitro do objeto utilizando where
  // e retorna apenas um com o findOne
  const user = await User.findOne({
    raw: true,
    where: { id: id },
  });

  res.render("userview", { user });
});

// rota para deletar usuario
app.post("/users/delete/:id", async (req, res) => {
  // recupera o id passado na url
  const id = req.params.id;

  // deleta o usuario do BD utilizando filtro de id
  await User.destroy({
    where: { id: id },
  });

  res.redirect("/");
});

// pagina principal, aonde retorna os usuarios criados
app.get("/", async (req, res) => {
  // faz a requisicao dos usuarios no BD
  // raw é para vir os dados em um array de objetos
  const users = await User.findAll({
    raw: true,
  });

  // renderiza a home, porem com os dados dos usuarios criados
  res.render("home", { users: users });
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
