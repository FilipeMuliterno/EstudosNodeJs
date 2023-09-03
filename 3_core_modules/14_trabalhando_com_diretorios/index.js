const fs = require("fs");

if (!fs.existsSync("./minhapasta")) {
  console.log("Não existe essa pasta");
}

fs.mkdirSync("minhapasta");
fs.mkdirSync("minhapasta/teste");

if (fs.existsSync("./minhapasta")) {
  console.log("Existe a pasta");
}
