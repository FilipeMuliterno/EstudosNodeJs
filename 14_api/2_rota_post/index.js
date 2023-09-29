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

// ex rota post
app.post("/createproduct", (req, res) => {
  // salvando os dados vindo pela requisicao
  const name = req.body.name;
  const price = req.body.price;

  console.log(name);
  console.log(price);

  res.json({message:`O produto ${name} foi criado com sucesso!`})
});

// ex rota get
app.get("/", (req, res) => {
  // resposta enviada em json
  res.json({ message: "primeira rota criada com sucesso!" });
});

app.listen(3000);
