const express = require("express");
const router = express.Router();

// controller
const ProductController = require("../controllers/ProductController");

// rota para pagina de criacao de produto
router.get("/create", ProductController.createProduct);
// rota para pagina de criacao de produto/ POST
router.post("/create", ProductController.createProductPost);
// rota produto individual
router.get("/:id", ProductController.getProduct);
// rota para deletar produto
router.post("/delete/:id", ProductController.deleteProduct);
// rota formulario de edicao
router.get("/edit/:id", ProductController.editProduct);
// rota formulario de edicao
router.post("/edit/:id", ProductController.editProductPost);
// rota principal
router.get("/", ProductController.showProducts);

module.exports = router;
