const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

// helper
const checkAuth = require("../helpers/auth").checkAuth;

// rota para post de pensamentos
router.post("/create", checkAuth, ToughtController.createToughtSave);
// rota para envio de pensamentos
router.get("/create", checkAuth, ToughtController.createTought);
// rota edicao pensamentos
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
// rota post edicao pensamentos
router.post("/edit", checkAuth, ToughtController.updateToughtSave);
// rota dashboard
router.get("/dashboard", checkAuth, ToughtController.dashboard);
// rota excluir pensamento
router.post("/remove", checkAuth, ToughtController.removeTought);
// rota principal
router.get("/", ToughtController.showToughts);

module.exports = router;
