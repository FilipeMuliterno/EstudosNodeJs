// const Product = require("../models/Product");

module.exports = class ProductControll {
  // funcao rota principal
  static showProducts(req, res) {
    res.render("products/all");
  }
};
