const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  // funcao para ir para pag de login
  static login(req, res) {
    res.render("auth/login");
  }

  // funcao para logar
  static async loginPost(req, res) {
    // pega os dados do form
    const { email, password } = req.body;

    // verifica se o usuario existe
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");

      return;
    }

    // verifica se a senha esta correta
    const passwordMath = bcrypt.compareSync(password, user.password);
    if (!passwordMath) {
      req.flash("message", "Senha incorreta!");
      res.render("auth/login");

      return;
    }

    // loga o user
    // inicializa a sessao
    req.session.userid = user.id;

    req.flash("message", "Logado com sucesso!");

    // salva a sessao antes de enviar o user para /
    req.session.save(() => {
      res.redirect("/");
    });
  }

  // funcao para ir para pag de registrar
  static register(req, res) {
    res.render("auth/register");
  }

  // funcao post do form register
  static async registerPost(req, res) {
    // pega os dados enviados no form
    const { name, email, password, confirmpassword } = req.body;

    // validacao para senha
    if (password != confirmpassword) {
      // mensagem flashcard
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");
      return;
    }

    // checa se o email ja existe
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    if (checkIfUserExists) {
      req.flash("message", "O email ja existe, tente novamente!");
      res.render("auth/register");
      return;
    }

    // cria a senha/criptografa para dificultar hack
    const salt = bcrypt.genSaltSync(10); // cria 10 caracteres aleatorios
    const hashedPassword = bcrypt.hashSync(password, salt); // cria a senha com a senha e os caracteres aleatorios

    // dados a enviar ao BD
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    // envia os dados ao BD
    try {
      const createdUser = await User.create(user);

      // inicializa a sessao apos criar o user
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      // salva a sessao antes de enviar o user para /
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  // funcao para logout
  static logout(req, res) {
    // remove a sessao do sistema
    req.session.destroy();
    res.redirect("/login");
  }
};
