const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

const produtos = [
  {
    item: "Mochila",
    id: "1",
    price: 120.0,
  },
  {
    item: "Lápis",
    id: "2",
    price: 5.99,
  },
  {
    item: "Estojo",
    id: "3",
    price: 16.99,
  },
];

app.get("/", (req, res) => {
  res.render("home", { produtos });
});

// cria uma url dinamica para cada id dos produtos
app.get("/produtos/:id", (req, res) => {
  // pega o produto no indice passado na url, como js começa em 0
  // definimos o valor passado -1, ou seja produto 1 -1 = 0, que é o primeiro item
  const produto = produtos[parseInt(req.params.id - 1)];
  res.render("produto", { produto });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
