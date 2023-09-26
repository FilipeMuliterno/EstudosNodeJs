const express = require("express");
const router = express.Router();

// controller
const ProductController = require("../controllers/ProductController");

// rota principal
router.get("/", ProductController.showProducts);

module.exports = router;
