const Tought = require("../models/Tought");
const User = require("../models/User");

const { Op } = require("sequelize");

module.exports = class ToughtController {
  // funcao rota principal
  static async showToughts(req, res) {
    // variavel com o valor para busca no BD
    let search = "";
    // pega o valor passado no search e coloca na variavel
    if (req.query.search) {
      search = req.query.search;
    }

    // ordem
    let order = "DESC";
    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    // pega todos os pensamentos/ com o usuario
    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        // filtra os dados vindos, utilizando o Op.like
        // e usando %%, que quer dizer que o que esta entre %%
        // desconsidera o resto, ou seja, se voce procurar por a
        // tudo que contenha a ira aparecer
        title: { [Op.like]: `%${search}%` },
      },
      // define a ordem
      order: [["createdAt", order]],
    });

    // funcao para extrair somente os pensamentos do user
    const toughts = toughtsData.map((result) => result.get({ plain: true }));

    // contagem de resultados da busca
    let searchQntd = toughts.length;
    if (searchQntd === 0) {
      searchQntd = false;
    }

    res.render("toughts/home", { toughts, search, searchQntd });
  }
  // funcao rota dashboard
  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      // busca os tought junto com o usuario
      // assim trazendo todos
      include: Tought,
      plain: true,
    });
    // verifica se o user existe
    if (!user) {
      res.redirect("/login");
    }

    // funcao para extrair somente os pensamentos do user
    const toughts = user.Toughts.map((result) => result.dataValues);

    // verifica se voce ja colocou algum pensamento ou nao e exibe em tela
    let emptyToughts = false;
    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }
  // funcao rota adicionar pensamento
  static createTought(req, res) {
    res.render("toughts/create");
  }
  // funcao rota post pensamento
  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };
    try {
      await Tought.create(tought);
      req.flash("message", "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
  // funcao remover pensamento
  static async removeTought(req, res) {
    // pega o id do post vindo pelo form
    const id = req.body.id;

    // pega o id do user logado
    const UserId = req.session.userid;

    // remove o post filtrando pelo id, e tambem verificando se o usuario
    // dono do post que esta removendo
    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });
      req.flash("message", "Pensamento removido com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
  // funcao edit pensamento
  static async updateTought(req, res) {
    // resgata o id do pensamento
    const id = req.params.id;

    // busca o pensamento pelo id
    const tought = await Tought.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    res.render("toughts/edit", { tought });
  }
  // funcao post edicao pensamento
  static async updateToughtSave(req, res) {
    // pega o id do pensamento
    const id = req.body.id;

    // pega o valor do form
    const tought = {
      title: req.body.title,
    };

    // atualiza os dados no bd
    try {
      await Tought.update(tought, {
        where: { id: id },
      });
      req.flash("message", "Pensamento editado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
