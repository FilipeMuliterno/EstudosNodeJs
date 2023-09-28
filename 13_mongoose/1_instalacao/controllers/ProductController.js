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

  // funcao produto especifico para rota dinamica
  static async getProduct(req, res) {
    // pega o id passado na rota
    const id = req.params.id;

    // e resgatamos o produto especifico pelo id
    // utilizando metodo criado no model
    const product = await Product.getProductById(id);

    res.render("products/product", { product });
  }

  // funcao para remover um produto
  static async deleteProduct(req, res) {
    // id vindo pela url
    const id = req.params.id;

    await Product.deleteProduct(id);

    res.redirect("/products");
  }

  // funcao para exibir form de edicao
  static async editProduct(req, res) {
    // id vindo pela url
    const id = req.params.id;

    // e resgatamos o produto especifico pelo id
    // utilizando metodo criado no model
    const product = await Product.getProductById(id);

    res.render("products/edit", { product });
  }

  // funcao para edicao dos dados passados no form
  static async editProductPost(req, res) {
    // id vindo pela url
    const id = req.params.id;

    // pega os dados enviados no form
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(name, image, price, description);

    // funcao para editar os dados no model
    await product.editProduct(id);

    res.redirect("/products");
  }
};
