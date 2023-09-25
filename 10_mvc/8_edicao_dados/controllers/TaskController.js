const Task = require("../models/Task");

// funcoes usadas na url /tasks
module.exports = class TaskController {
  // funcao usada para rota do form
  static createTask(req, res) {
    res.render("tasks/create");
  }

  // funcao que resgata os dados para edicao
  static async updateTask(req, res) {
    // pega o id vindo pela url
    const id = req.params.id;

    // resgata os dados do item especificando pela id
    const task = await Task.findOne({ where: { id: id }, raw: true });

    res.render("tasks/edit", { task });
  }

  // funcao post que atualiza os dados em si
  static async updateTaskPost(req, res) {
    // recupera o id
    const id = req.body.id;
    // variavel com os dados vindos do form
    const task = {
      title: req.body.title,
      description: req.body.description,
    };
    // atualiza os dados que o id for compativel
    await Task.update(task, { where: { id: id } });

    res.redirect("/tasks");
  }

  // funcao para action do form POST
  // como vai mexer com o BD, fazemos ela async
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

  // funcao usada para remover algum dado
  static async removeTask(req, res) {
    // recupera o id da task a ser removida
    const id = req.body.id;

    // remove a tarefa aonde o id passado e igual ao do BD
    await Task.destroy({
      where: { id: id },
    });

    // redireciona para pagina principal, aonde os dados sao mostrados
    res.redirect("/tasks");
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
};
