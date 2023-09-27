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
// rota principal
router.get("/", ProductController.showProducts);

module.exports = router;
