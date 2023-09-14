const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

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

// rota para form de edicao de dados
app.get("/users/edit/:id", async (req, res) => {
  // recupera o id passado na url
  const id = req.params.id;

  try {
    // recupera os dados do usuario com filtro de id
    const user = await User.findOne({
      include: Address,
      where: { id: id },
    });

    // renderiza a pagina com os parametros do usuario recuperado
    res.render("useredit", { user: user.get({ plain: true }) });
  } catch (error) {
    console.log(error);
  }
});

// rota que faz a edicao dos dados passados no form de edicao
app.post("/users/update", async (req, res) => {
  // recupera os dados preenchidos no form
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter; // se estiver checkada vem com valor de 'on'
  // verifica se esta como on, e muda para true, caso esteja desmarcada como false
  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  // fazemos um objeto com todos os dados, para facilitar o envio
  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  // o update em si, primeiro parametro é os dados a serem modificados
  // where filtra o user pelo id para nao modificar todos
  await User.update(userData, { where: { id: id } });

  res.redirect("/");
});

// rota para post de endereco
app.post("/adress/create", async (req, res) => {
  // recuperando os dados enviados pelo form
  // incluindo UserId, que e para a relacao
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  // fazemos um objeto com todos os dados, para facilitar o envio
  const adress = {
    UserId,
    street,
    number,
    city,
  };

  // vai criar o endereco atrelado ao usuario que o criou
  await Address.create(adress);

  // redireciona o para a pagina do usuario que criou o endereco
  res.redirect(`/users/edit/${UserId}`);
});

// rota post para deletar endereco especifico
app.post("/adress/delete", async (req, res) => {
  // recupera o id passado no form
  const id = req.body.id;
  // recupera o id do usuario que esta excluindo
  const UserId = req.body.UserId;

  // exclui o endereco de acordo com o id passado
  await Address.destroy({
    where: { id: id },
  });

  res.redirect(`/users/edit/${UserId}`);
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
  //.sync({force : true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
