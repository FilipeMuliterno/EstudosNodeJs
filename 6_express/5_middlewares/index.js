const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const basePath = path.join(__dirname, "templates"); // __dirname é o diretório atual, e depois o diretório a acessar

// Simula uma verificação de usuário
const checkAuth = function (req, res, next) {
  req.authStatus = true; // Determina se o usuário pode acessar ou não

  if (req.authStatus) {
    console.log("Está logado");
    next(); // Precisamos utilizar isso, para que a aplicação continue, em caso de sucesso
  } else {
    console.log("Não está logado, faça o login!");
    next();
  }
};

app.use(checkAuth);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.get("/contato", (req, res) => {
  res.sendFile(`${basePath}/contato.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
