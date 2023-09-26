const { MongoClient } = require("mongodb");

// protocolo padrao/ testemongodb e o nome do banco
const uri = "mongodb://127.0.0.1:27017/testemongodb";

// instancia a variavel client ao uri
const client = new MongoClient(uri);

// funcao que executa a conexao
async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

// executa a conexao
run();

module.exports = client;
