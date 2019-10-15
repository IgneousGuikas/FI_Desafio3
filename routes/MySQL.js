const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "repolho63",
  database: "FIDesafio3"
});

function getDataProcess(req,res) {
  con.query("SELECT * FROM logDataProcess", function(err,result,fields) {
    if(err) res.json({dados: []});
    res.json({dados: result});
  });

}

function getDataAlarms(req,res) {
  con.query("SELECT * FROM logDataAlarms", function(err,result,fields) {
    if(err) res.json({dados: []});
    res.json({dados: result});
  });

}

function getDataActivities(req,res) {
  con.query("SELECT * FROM logActivities", function(err,result,fields) {
    if(err) res.json({dados: []});
    res.json({dados: result});
  });

}

function getIPs(req,res) {
  con.query("SELCT * FROM logMachines", function(err,result,fields) {
    if(err) res.send("");
  });
}

module.exports = con;
