const os = require("os");

console.log(os.cpus()); // quantos cpus tem o servidor
console.log(os.freemem()); // quanta memória livre tem
console.log(os.homedir()); // qual o diretório principal
console.log(os.type()); // qual o sistema operacional está rodando
