const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const users = require("./users");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// arquivos estáticos
app.use(express.static("public"));

const basePath = path.join(__dirname, "templates"); // __dirname é o diretório atual, e depois o diretório a acessar

app.use("/users", users);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use(function (req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
