const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "repolho63",
  database: "FIDesafio3"
});

module.exports = con;
