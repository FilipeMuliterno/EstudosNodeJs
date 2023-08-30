const chalk = require("chalk");

const nota = process.argv[2];

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns! Você está aprovado!"));
} else {
  console.log(chalk.bgRed.black("Você reprovou!"));
}

// node .\index.js "Nota"