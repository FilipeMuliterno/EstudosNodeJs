const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
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

// pagina principal
app.get("/", (req, res) => {
  res.render("home");
});

// pagina para post, utilizando form com action nessa url
app.post("/books/insertbook", (req, res) => {
  const title = req.body.title; // recupera o titulo enviado no form
  const pageqty = req.body.pageqty; // recupera a quantidade de paginas enviada no form

  // define a query(instrucao) que fara o envio dos dados ao banco
  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  // envia os dados(query) ao banco
  conn.query(query, function (err) {
    // caso de erro ele apresenta
    if (err) {
      console.log(err);
    }

    // e em caso de sucesso ele redireciona para home
    res.redirect("/");
  });
});

// definindo o banco de dados
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// conectando ao banco de dados
conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao banco de dados");

  // iniciando o servidor
  app.listen(3000, () => {
    console.log(`Aplicação rodando`);
  });
});
