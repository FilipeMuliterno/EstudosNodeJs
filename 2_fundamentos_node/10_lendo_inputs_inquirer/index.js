// const inquirer = require("inquirer");

// inquirer
//   .prompt([
//     {
//       name: "p1",
//       message: "Qual a primeira nota:",
//     },
//     { name: "p2", message: "Qual a segunda nota:" },
//   ])
//   .then((answers) => {
//     console.log(answers);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//------------------
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "n1",
      message: "Digite o primeiro número da soma:",
    },
    { name: "n2", message: "Digite o segundo número da soma:" },
  ])
  .then((answers) => {
    const soma = parseInt(answers.n1) + parseInt(answers.n2);
    console.log(soma);
  })
  .catch((err) => {
    console.log(err);
  });
