const express = require("express");
const router = express.Router();

// puxa o controller para definir as rotas /tasks/ alguma coisa
const TaskController = require("../controllers/TaskController");

router.get("/add", TaskController.createTask);
router.get("/", TaskController.showTasks);

module.exports = router;
