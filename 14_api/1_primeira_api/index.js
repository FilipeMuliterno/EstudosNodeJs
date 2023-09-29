const express = require("express");
const app = express();

// middleware para ler a requisicao em JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// rotas - endpoints
app.get("/", (req, res) => {
  // resposta enviada em json
  res.json({ message: "primeira rota criada com sucesso!" });
});

app.listen(3000);
