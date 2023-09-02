const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true); //salva a url em um objeto com  que contém informações sobre a URL, incluindo os parâmetros da query string, se houver algum.
  const filename = q.pathname.substring(1); //ele acessa o pathname da url, e o subtring(1), por que o primeiro seria /

  if (filename.includes("html")) {
    //verifica se no filename tem html, como usamos subtring(1) ele pula a /
    if (fs.existsSync(filename)) {
      //verifica se o arquivo existe
      fs.readFile(filename, function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      fs.readFile("404.html", function (err, data) {
        //Caso ele nao encontre a url ele encaminha para uma página de erro
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  } else {
    fs.readFile("404.html", function (err, data) {
      //Caso ele nao encontre a url ele encaminha para uma página de erro
      //E tambem caso o usuario não coloque nada apos a /
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
