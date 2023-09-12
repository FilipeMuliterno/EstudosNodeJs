const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // limita as conexoes
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

module.exports = pool;
