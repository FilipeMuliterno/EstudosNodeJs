const express = require("express");
const router = express.Router();

// puxa o controller para definir as rotas /tasks/ alguma coisa
const TaskController = require("../controllers/TaskController");

// rota com o form
router.get("/add", TaskController.createTask); 
// rota do action do form 
router.post("/add", TaskController.createTaskSave);
// rota principal
router.get("/", TaskController.showTasks);

module.exports = router;
