const path = require("path");
const customPath = "/relatorios/filipe/relatorio.pdf";

console.log(path.dirname(customPath)); // Diretório/caminho
console.log(path.basename(customPath)); // nome do arquivo
console.log(path.extname(customPath)); // extensão do arquivo
