const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "nome",
      message: "Digite seu nome:",
    },
    { name: "idade", message: "Digite sua idade:" },
  ])
  .then((answers) => {
    if (!answers.nome || !answers.idade) {
      throw new Error("O nome e a idade são obrigatórios!");
    }
    console.log(chalk.bgYellow.black(`O nome do usuário é: ${answers.nome}`));
    console.log(chalk.bgYellow.black(`A idade do usuário é: ${answers.idade}`));
  })
  .catch((err) => {
    console.log(`Erro: ${err}`);
  });
