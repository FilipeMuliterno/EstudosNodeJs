// Externo
const minimist = require("minimist");

//Interno
const soma = require("./soma").soma;

const args = minimist(process.argv.slice(2));

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

soma(a, b);

// node .\index.js --a=3 --b=5