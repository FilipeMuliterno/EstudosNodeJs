const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// setup basico de handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// renderizando home que esta dentro de views
app.get("/", (req, res) => {
  const user = {
    name: "Filipe",
    surname: "Muliterno",
  };
  const id = 254;
  const auth = true;
  res.render("home", { user: user, id, auth });
});

app.get("/dashbord", (req, res) => {
  const itens = ["item a", "item b", "item c"];
  res.render("dashbord", { itens });
});

// rodando na porta 3000
app.listen(3000, () => {
  console.log(`Aplicação rodando`);
});
