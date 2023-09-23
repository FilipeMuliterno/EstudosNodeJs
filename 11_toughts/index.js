const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const app = express();
const conn = require("./db/conn");

// Models
const Tought = require("./models/Tought");
const User = require("./models/User");

// import routes
const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

// import controller
const ToughtController = require("./controllers/ToughtController");

// configuracoes handlebars/template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// session middleware/mostra aonde o session vai salvar as sessoes
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      // aqui ele busca e define a pasta sessions como pasta para salvar
      // as sessoes
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    // cookie utilizado para determinar tempo maximo do usuario logado
    // na pagina, 360000 = 1 dia
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// flash messages
app.use(flash());

// public/css
app.use(express.static("public"));

// salvar sessao na resposta/verifica se o user esta logado
// caso nao esteja passa direto
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// routes
app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", ToughtController.showToughts);

// conexao com BD e iniciando servidor
conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
