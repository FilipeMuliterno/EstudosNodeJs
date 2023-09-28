const mongoose = require("mongoose");

// funcao para conexao
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/testemongoose");
  console.log("Conectou com o Mongoose!");
}

// execucao da conexao
main().catch((err) => {
  console.log(err);
});

module.exports = mongoose;
