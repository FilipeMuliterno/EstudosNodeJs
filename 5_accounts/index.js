// modulos externos
const chalk = require("chalk");
const inquirer = require("inquirer");

// core modules
const fs = require("fs");

operation(); // Invoca a opcao para ser executada assim que iniciar o projeto

// operacao principal //
function operation() {
  inquirer
    .prompt([
      {
        type: "list", // Para o usuario poder escolher
        name: "action", // Name para a pergunta para poder referenciar a ela
        mesage: "O que você deseja fazer?", // A pergunta em si
        choices: [
          // A lista de opções para o usuario escolher
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    // Como o prompt do inquirer é baseado em promises, precisamos de then
    .then((answer) => {
      const action = answer["action"]; // Salva a acao que o usuario fez

      // Executa a acao de acordo com a opcao selecionada
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"));
        process.exit(); // encerra a execucao do sistema
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// criar uma conta //
// Apos a opcao selecionada ele executa as seguintes mensagens
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount(); // Chama a funcao que cria a conta
}

// Cria a conta
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"]; // salva em uma variavel o nome da conta
      console.info(accountName); // exibe o nome da conta

      // verifica se existe esse diretorio(pasta) aonde ficam salvas as contas
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts"); // se nao existir ele cria
      }

      // Verifica se a conta existe dentro da pasta, caso exista ele exibe a mensagem
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome!")
        );
        buildAccount(); // como a conta ja existe ele volta para a opcao anterior de criar conta
        return; // encerra as acoes para evitar bugs
      }

      // caso o nome nao exista ele cria a conta
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err);
        }
      );

      // mensagem de sucesso apos a conta ser criada
      console.log(chalk.green("Parabéns, a sua conta foi criada!"));

      operation(); // retorna ao inicio das opcoes, como um caixa eletronico
    })
    .catch((err) => {
      console.log(err);
    });
}

// adiciona certo valor a conta

function deposit() {
  // primeiro verificamos a conta
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"]; // salva o valor passado em uma variavel

      // verifica se a conta nao existe
      if (!checkAccount(accountName)) {
        return deposit();
      }

      // se ela existir segue o deposito
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual o valor do deposito?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"]; // salva o valor passado

          // adiciona o valor na conta
          addAmount(accountName, amount); // funcao que faz o deposito
          operation(); // apos o deposito ele retorna para a operacao
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// funcao que faz verificacao de conta, caso ela nao exista ele retorna false, caso exista retorna true
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta não existe, escolha outro nome!")
    );
    return false;
  }

  return true;
}

// funcao que adiciona o valor na conta
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName); // salva a conta passada em uma variavel

  // caso o usuario nao digite nada, retorna isso
  if (!amount) {
    console.log(
      chalk.bgBlack.red("Ocorreu um erro, tente novamente mais tarde!")
    );
    return deposit();
  }

  // salva o valor passado na variavel, atribui caso ja exista valor dentro da conta
  accountData.balance += parseFloat(amount);

  // escreve no arquivo o que foi alterado, no caso o valor passado
  fs.writeFileSync(
    `accounts/${accountName}.json`, // pega a conta passada
    JSON.stringify(accountData), // tranforma o JSON em texto
    function (err) {
      console.log(err);
    }
  );

  // retorna uma mensagem de sucesso e volta para o inicio da operacao
  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  );
}

// funcao que retorna a conta
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8", // para poder ler em utf8, aceitando acentos, etc.
    flag: "r", // significa que e somente para leitura
  });

  return JSON.parse(accountJSON); // o valor retornado vem em texto, e entao tranforma em JSON denovo
}

// funcao que mostra o saldo da conta
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"]; // salva o valor passado

      // verifica se a conta nao existe
      if (!checkAccount(accountName)) {
        return getAccountBalance(); // caso a conta nao exista ele retorna para a parte aonde passa a conta
      }

      // caso a conta exista o codigo segue para recuperar o saldo
      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`
        )
      );
      operation(); // depois de exibir em tela o saldo ele retorna para a operacao inicial
    })
    .catch((err) => {
      console.log(err);
    });
}

// funcao para sacar
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"]; // salva o valor passado

      // verifica se a conta nao existe
      if (!checkAccount(accountName)) {
        return withdraw(); // caso a conta nao exista ele retorna para a parte aonde passa a conta
      }

      // apos verificar se a conta existe o saque continua
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"]; // salva o valor passado
          removeAmount(accountName, amount); // funcao que remove valor da conta
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// funcao que remove valor da conta
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName); // recupera a conta passada

  // verifica se foi passado algum valor
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );
    return withdraw(); // retorna para passar o valor
  }

  // verifica se o valor para saque e menor ou igual do que o disponivel na conta
  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponpivel!"));
    return withdraw(); // retorna para passar o valor
  }

  accountData.balance -= parseFloat(amount); // reduz o valor passado com o total da conta

  // escreve o valor atualizado no arquivo
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  // mensagem de sucesso
  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );

  operation(); // retorna a operacao inicial
}
