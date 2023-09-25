const Task = require("../models/Task");

// funcoes usadas na url /tasks
module.exports = class TaskController {
  // funcao usaeda para rota do form
  static createTask(req, res) {
    res.render("tasks/create");
  }

  // funcao para rota inicial, que mostra as tasks
  static async showTasks(req, res) {
    // resgata todos os itens da tabela Task
    const tasks = await Task.findAll({
      raw: true,
    });

    // renderiza o arquivo all, importanto tasks para dentro dele
    res.render("tasks/all", { tasks });
  }

  // funcao para action do form POST
  // como vai mecher com o BD, fazemos ela async
  static async createTaskSave(req, res) {
    // variavel com os dados vindos do form
    const task = {
      title: req.body.title,
      description: req.body.description,
      // done vem como false, pois a task vem como false, ou seja
      // ela nao esta feita
      done: false,
    };

    // salva os dados no Task, que é a tabela do BD
    await Task.create(task);

    // redireciona para pagina principal, aonde os dados sao mostrados
    res.redirect("/tasks");
  }
};
