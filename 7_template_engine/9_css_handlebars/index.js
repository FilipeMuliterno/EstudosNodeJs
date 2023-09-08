const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

// setup basico de handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

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
  const posts = [
    {
      title: "Aprender node",
      categoria: "js",
      body: "teste",
      comments: 4,
    },
    {
      title: "Aprender php",
      categoria: "php",
      body: "teste",
      comments: 4,
    },
    {
      title: "Aprender python",
      categoria: "phyton",
      body: "teste",
      comments: 4,
    },
  ];
  res.render("dashbord", { posts });
});

// rodando na porta 3000
app.listen(3000, () => {
  console.log(`Aplicação rodando`);
});
