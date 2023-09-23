const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// rota para login
router.get("/login", AuthController.login);
// rota para registrar
router.get("/register", AuthController.register);
// rota post para registrar
router.post("/register", AuthController.registerPost);
// rota para logout
router.get("/logout", AuthController.logout);
// rota post para login
router.post("/login", AuthController.loginPost);

module.exports = router;
