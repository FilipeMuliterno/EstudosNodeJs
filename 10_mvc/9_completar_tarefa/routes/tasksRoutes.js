const express = require("express");
const router = express.Router();

// puxa o controller para definir as rotas /tasks/ alguma coisa
const TaskController = require("../controllers/TaskController");

// rota com o form
router.get("/add", TaskController.createTask);
// rota do action do form
router.post("/add", TaskController.createTaskSave);
// rota para remover algum dado
router.post("/remove", TaskController.removeTask);
// rota para edicao
router.get("/edit/:id", TaskController.updateTask);
// rota que atualiza os dados no BD
router.post("/edit", TaskController.updateTaskPost);
// rota para dar update no status da tarefa
router.post("/updatestatus", TaskController.toggleTaskStatus);
// rota que mostra cada item indidual
router.get("/:id", TaskController.taskIndividual);
// rota principal
router.get("/", TaskController.showTasks);

module.exports = router;
