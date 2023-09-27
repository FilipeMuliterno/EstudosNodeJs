const conn = require("../db/conn");

class Product {
  // metodo construtor, para passar os dados como parametro
  constructor(name, image, price, description) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  // metodo save/ funcao que ira inserir os dados no BD
  // ja criando a collection ou utilizando se ja existir
  save() {
    const product = conn.db().collection("products").insertOne({
      // e aqui passamos os dados a serem inseridos
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description,
    });

    // somente para verificar se a insercao deu certo
    return product;
  }

  // funcao para retornar os dados do BD para exibicao
  static getProducts() {
    // variavel com os dados do BD
    const products = conn.db().collection("products").find().toArray();

    return products;
  }
}

module.exports = Product;
