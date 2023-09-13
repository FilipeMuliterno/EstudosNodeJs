const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

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



app.listen(3000, () => {
  console.log(`Aplicação rodando`);
});
