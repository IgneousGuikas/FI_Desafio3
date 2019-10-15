const express = require('express');
const mysql = require('mysql');
const machinesGetroutes = require('./routes/machines/getRoutes.js');

var app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "repolho63",
  database: "FIDesafio3"
});

con.connect(function(err) {
  if(err) throw err;
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(machinesGetroutes);

app.get('/getData/process', function(req,res,next) {
  console.log("localhost:3000/getData/process");

  con.query("SELECT * FROM logDataProcess", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

app.get('/getData/alarms', function(req,res,next) {
  console.log("localhost:3000/getData/alarms");

  con.query("SELECT * FROM logDataAlarms", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

app.get('/getData/activities', function(req,res,next) {
  console.log("localhost:3000/getData/activities");

  con.query("SELECT * FROM logActivities", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});



app.post('/updateData/process', function(req,res,next) {
  console.log("localhost:3000/updateData/process");

  con.query("SELECT MACHINEID FROM logMachines WHERE IP = \"" + req.body.machineIP + "\"", function(err,result,fields) {
    if(err) throw err;

    var date = new Date();

    var sql = "INSERT INTO logDataProcess (MACHINEID, DATE, MAIN_PROGRAM, RUNNING_PROGRAM, RUNNING_SEQUENCE) VALUES (";
    sql = sql + result[0].MACHINEID + ", ";
    sql = sql + "\"" + date.toUTCString() + "\", ";
    sql = sql + req.body.main_program + ", ";
    sql = sql + req.body.running_program + ", ";
    sql = sql + req.body.running_sequence + ")";

    con.query(sql, function(err) {
      if(err) throw err;
    });

  });

  res.json(req.body);
});

app.post('/updateData/alarms', function(req,res,next) {
  console.log("localhost:3000/updateData/alarms");

  con.query("SELECT MACHINEID FROM logMachines WHERE IP = \"" + req.body.machineIP + "\"", function(err,result,fields) {
    if(err) throw err;

    var date = new Date();

    var sql = "INSERT INTO logDataAlarms (MACHINEID, DATE, ALARM_TYPE) VALUES (";
    sql = sql + result[0].MACHINEID + ", ";
    sql = sql + "\"" + date.toUTCString() + "\", ";
    sql = sql + req.body.alarm_type + ")";

    con.query(sql, function(err) {
      if(err) throw err;
    });

  });

  res.json(req.body);
});

app.post('/updateData/activities', function(req,res,next) {
  console.log("localhost:3000/updateData/activities");

  con.query("SELECT MACHINEID FROM logMachines WHERE IP = \"" + req.body.machineIP + "\"", function(err,result,fields) {
    if(err) throw err;

    var date = new Date();

    var sql = "INSERT INTO logActivities (MACHINEID, DATE, ACTIVITY) VALUES (";
    sql = sql + result[0].MACHINEID + ", ";
    sql = sql + "\"" + date.toUTCString() + "\", ";
    sql = sql + "\"" + req.body.activity + "\")";

    con.query(sql, function(err) {
      if(err) throw err;
    });

  });

  res.json(req.body);
});



app.post('/updateMachines/add', function(req,res,next) {
  console.log("localhost:3000/updateMachines/add");

  con.query("SELECT IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var ip_exist = false;
    result.forEach(function (value) {
      if(value.IP == req.body.IP) {
        ip_exist = true;
      }
    });

    if(ip_exist) {
      res.send("Este IP já existe.");
    } else {

      con.query("INSERT INTO logMachines (IP) values (\"" + req.body.IP + "\")", function(err) {
        if(err) throw err;
      });

      res.send("O IP \"" + req.body.IP + "\" foi adicionado com sucesso.");

    }

  });

});

app.post('/updateMachines/del', function(req,res,next) {
  console.log("localhost:3000/updateMachines/del");

  con.query("SELECT MACHINEID,IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

      var ip_exist = false;
      var id_machine;
      result.forEach(function (value) {
        if(value.IP == req.body.IP) {
          ip_exist = true;
          id_machine = value.MACHINEID;
        }
      });

      if(ip_exist) {
        con.query("DELETE FROM logDataProcess WHERE MACHINEID = " + id_machine, function(err) {
          if(err) throw err;
        });

        con.query("DELETE FROM logDataAlarms WHERE MACHINEID = " + id_machine, function(err) {
          if(err) throw err;
        });

        con.query("DELETE FROM logActivities WHERE MACHINEID = " + id_machine, function(err) {
          if(err) throw err;
        });

        con.query("DELETE FROM logMachines WHERE IP = \"" + req.body.IP + "\"", function(err) {
          if(err) throw err;
        });

        res.send("O IP \"" + req.body.IP + "\" foi deletado com sucesso.");
      } else {
        res.send("Este IP não existe.");
      }

  });

});

app.post('/updateMachines/info', function(req,res,next) {
  console.log("localhost:3000/updateMachines/Info");

  var sql = "UPDATE logMachines SET ";
  sql = sql + "MAX_AXIS = " + req.body.max_axis + ", ";
  sql = sql + "CNC_TYPE = \"" + req.body.cnc_type + "\", ";
  sql = sql + "MT_TYPE = \"" + req.body.mt_type + "\", ";
  sql = sql + "SERIES = \"" + req.body.series + "\", ";
  sql = sql + "VERSION = \"" + req.body.version + "\" ";
  sql = sql + "WHERE IP = \"" + req.body.machineIP + "\"";

  con.query(sql, function(err) {
    if(err) throw err;
  });

  res.json(req.body);
});



app.listen(3000,()=>console.log("Listening to port 3000"));

