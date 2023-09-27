const Product = require("../models/Product");

module.exports = class ProductControll {
  // funcao rota principal
  static async showProducts(req, res) {
    // funcao que recupera os dados do BD
    const products = await Product.getProducts();

    res.render("products/all", { products });
  }

  // funcao para criacao de produtos
  static createProduct(req, res) {
    res.render("products/create");
  }

  // funcao para criacao de produtos/post
  static createProductPost(req, res) {
    // pega os dados enviados no form
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    // agora passamos os dados para a funcao construtora
    // com os dados como parametro, na ordem passada no model
    const product = new Product(name, image, price, description);

    // funcao que salva em si no BD
    product.save();

    res.redirect("/products");
  }
};
