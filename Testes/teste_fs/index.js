const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Escreva o texto a ser salvo:", (language) => {
  fs.writeFileSync("arquivo.txt", language);
  readline.close();
});
