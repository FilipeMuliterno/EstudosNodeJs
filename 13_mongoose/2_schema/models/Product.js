const mongoose = require("mongoose");
const { Schema } = mongoose;

// criando o nosso model
const Product = mongoose.model(
  // primeiro passamos o nome
  "Product",
  // depois instanciamos o schema que é a estrutura do model
  new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  })
);

module.exports = Product;
