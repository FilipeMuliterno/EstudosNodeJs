module.exports.checkAuth = function (req, res, next) {
  // verifica se o user esta logado
  // se o usuario nao estiver logado ele sera redirecionado
  // assim podemos colocar por exemplo em rotas aonde exigem login
  // entao o user sera redirecionado caso nao esteja logado
  // um exemplo e na dashboar
  const userId = req.session.userid;
  if (!userId) {
    res.redirect("/login");
  }

  next();
};
