// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("Qual a sua linguabem preferida?", (language) => {
//   console.log(`A minha lingaugem preferida é ${language}`);
//   readline.close();
// });

// -------------------------------

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var lang = "";

readline.question("Qual a sua linguabem preferida?", (language) => {
  lang = language;
  readline.close();
});

setTimeout(() => {
  console.log("Minha linguagem preferida é:" + lang);
},5000);


