const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const basePath = path.join(__dirname, "templates"); // __dirname é o diretório atual, e depois o diretório a acessar

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.get("/contato", (req, res) => {
  res.sendFile(`${basePath}/contato.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
