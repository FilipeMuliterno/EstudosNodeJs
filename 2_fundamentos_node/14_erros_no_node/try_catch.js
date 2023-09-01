const x = "10";

try {
  x = 2; // tentando reatribuir um valor a uma const
} catch (err) {
  console.log(`Erro: ${err}`);
}

console.log("Continuação do código");
