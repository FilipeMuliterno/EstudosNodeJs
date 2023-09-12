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

  // envia os dados,comando(query) ao banco
  conn.query(query, function (err) {
    // caso de erro ele apresenta
    if (err) {
      console.log(err);
    }

    // e em caso de sucesso ele redireciona para home
    res.redirect("/");
  });
});

// rota que tera todo os livros enviados
app.get("/books", (req, res) => {
  // envia o comando(query) ao banco
  const query = "SELECT * FROM books";
  conn.query(query, function (err, data) {
    // caso de erro ele apresenta
    if (err) {
      console.log(err);
    }

    // salva os dados do banco em uma const
    const books = data;

    // renderiza a pagina books, passando os dados(books) para poder ser utilizado no front
    res.render("books", { books });
  });
});

// criando uma rota especifica para cada um dos livros, utilizando o id
app.get("/books/:id", (req, res) => {
  // recupera o id da url
  const id = req.params.id;

  // recupera o item do BD aonde o id da rota for igual o id do banco
  const query = `SELECT * FROM books WHERE id = ${id}`;

  // faz a requisição no banco de dados
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
    }

    // salva o dado especifico vindo do BD na variavel book
    const book = data[0];

    // renderiza uma página dinamica para cada livro, dependendo do id passado
    res.render("book", { book });
  });
});

// criando rota especifica para fazer a edição de cada livro especifico
app.get("/books/edit/:id", (req, res) => {
  // recupera o id da url
  const id = req.params.id;

  // recupera o item do BD aonde o id da rota for igual o id do banco
  const query = `SELECT * FROM books WHERE id = ${id}`;

  // faz a requisição no banco de dados
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
    }

    // salva o dado especifico vindo do BD na variavel book
    const book = data[0];

    // renderiza uma página dinamica para cada livro, dependendo do id passado
    res.render("editbook", { book });
  });
});

// criando rota que envia(POST) os dados editados na books/edit
app.post("/books/updatebook", (req, res) => {
  // recupera od dados passados no form do edit
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  // query que fara a atualização no BD
  const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;

  // faz a alteração utilizando a query acima no banco de dados
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err);
    }

    // se a atualização der certo ele redireciona para a pagina do livro alterado
    res.redirect(`/books/${id}`);
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
