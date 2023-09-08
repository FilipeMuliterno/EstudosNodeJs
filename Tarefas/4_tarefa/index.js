const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

const obj = ["Lapis", "Caderno", "Estojo", "Mochila", "Borracha"];

app.get("/", (req, res) => {
  res.render("home", { obj });
});

obj.forEach((item) => {
  app.get(`/produtos/${item}`, (req, res) => {
    res.render(`${item}`);
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
