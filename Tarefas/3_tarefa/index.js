const express = require("express");
const app = express();
const path = require("path");
const contato = require("./contato");
const port = 5000;

// pegando o caminho para os arquivos html
const basePath = path.join(__dirname, "templates");

// arquivos estáticos(css)
app.use(express.static("public"));

// import de contato
app.use("/contato", contato);

// pag principal
app.get("/", (req, res) => {
  res.sendFile(`${basePath}/home.html`);
});

// pag 404
app.use(function (req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`);
});

// escutando a porta
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
