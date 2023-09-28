const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// configuracoes handlebars/template engine "express-handlebars": "^5.3.3",
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// conexao ao BD
const conn = require("./db/conn").run;

// routes
const productsRoutes = require("./routes/productsRoutes");

// estrutura para ler o body, post/ ler json
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// public/css
app.use(express.static("public"));

// rota products
app.use("/products", productsRoutes);

// server
app.listen(3000);
