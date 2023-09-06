const express = require("express");
const router = express.Router();
const path = require("path");

// pegando o caminho para os arquivos html
const basePath = path.join(__dirname, "../templates");

// usa somente url /, pois dentro de contato so temos /contatos, então não precisa especificar
router.get("/", (req, res) => {
  res.sendFile(`${basePath}/contato.html`);
});

module.exports = router;
