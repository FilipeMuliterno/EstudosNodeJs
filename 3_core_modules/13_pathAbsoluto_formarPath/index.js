const path = require("path");

// path absoluto
console.log(path.resolve("teste.txt"));
// D:\Estudos\Estudos NodeJs\3_core_modules\13_pathAbsoluto_formarPath\teste.txt

// formar path
const midFolder = "relatorios";
const fileName = "filipe.txt";

const finalPath = path.join("/", "arquivos", midFolder, fileName);
console.log(finalPath);
//\arquivos\relatorios\filipe.txt