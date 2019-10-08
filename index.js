const express = require('express');
const mysql = require('mysql');

var app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "repolho63",
  database: "FIDesafio3"
});

var dados = [];

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/', function(req,res,next) {
  var temp = {
    date: new Date(Date.now()),
    dados: JSON.stringify(req.body),
    request: req.ip + " " + req.method
  }
  if(dados.length == 13) {
    dados.shift();
  }
  dados.push(temp);
  console.log(dados.length.toString());
  res.json(req.body);
});

app.get('/getData', function(req,res,next) {
  var temp = "";
  var i;
  for(i = 0; i<dados.length; i++) {
    if(i != 0) {
      temp = temp + "SP,SP";
    }
    temp = temp + JSON.stringify(dados[i]);
  }
  res.send(temp);
});

app.listen(3000,()=>console.log("Listening to port 3000"));
