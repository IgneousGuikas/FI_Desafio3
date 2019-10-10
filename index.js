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



app.get('/getIPs', function(req,res,next) {
  console.log("localhost:3000/getIPs");
  res.send("");
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



app.post('/updateData/process', function(req,res,next) {
  console.log("localhost:3000/updateData/process");
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});

app.post('/updateData/alarms', function(req,res,next) {
  console.log("localhost:3000/updateData/alarms");
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});

app.post('/updateData/activities', function(req,res,next) {
  console.log("localhost:3000/updateData/activities");
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});



app.post('/updateMachines/info', function(req,res,next) {
  console.log("localhost:3000/updateMachines/Info");
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});



app.listen(3000,()=>console.log("Listening to port 3000"));
