const express = require('express');
const mysql = require('mysql');

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



function crd(data_list) {
  var data = "";
  var i;
  for(i=0; i<data_list.length; i++) {
    if(i != 0) {
      data = data + "SP,SP";
    }
    data = data + JSON.stringify(data_list[i]);
  }
  console.log(data);
  return data;
}



app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get('/getIPs', function(req,res,next) {
  console.log("localhost:3000/getIPs");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var IP_list = "";
    var i;
    for(i=0; i<result.length; i++) {
      var temp = result[i];
      IP_list = IP_list + temp.IP;
      if(temp.MAX_AXIS == null ||
          temp.CNC_TYPE == null ||
          temp.MT_TYPE == null ||
          temp.SERIES == null ||
          temp.VERSION == null) {
        IP_list = IP_list + "N";
      }
      IP_list = IP_list + ",";
    }
    res.send(IP_list);

  });

});



app.get('/getData/process', function(req,res,next) {
  console.log("localhost:3000/getData/process");

  con.query("SELECT * FROM logDataProcess", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

});

app.get('/getData/alarms', function(req,res,next) {
  console.log("localhost:3000/getData/alarms");

  con.query("SELECT * FROM logDataAlarms", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

});

app.get('/getData/activities', function(req,res,next) {
  console.log("localhost:3000/getData/activities");

  con.query("SELECT * FROM logActivities", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

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



app.get('/getMachines', function(req,res,next) {
  console.log("localhost:3000/getMachines");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var data = crd(result);
    res.send(data);

  });

});



app.post('/updateMachines/add', function(req,res,next) {
  console.log("localhost:3000/updateMachines/add");

  con.query("INSERT INTO logMachines (IP) values (\"" + req.body.IP + "\")", function(err) {
    if(err) throw err;
  });

  res.send("O IP \"" + req.body.IP + "\" foi adicionado com sucesso.");
});

app.post('/updateMachines/del', function(req,res,next) {
  console.log("localhost:3000/updateMachines/del");

  con.query("SELECT MACHINEID,IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

      var i;
      for(i=0; i<result.length; i++) {
      }

  });

  con.query("DELETE FROM logMachines WHERE MACHINEID = " + req.body.IDX, function(err) {
    if(err) throw err;
  });

  res.send("O IP \"" + machineip + "\" foi removido com sucesso.");
});

app.post('/updateMachines/info', function(req,res,next) {
  console.log("localhost:3000/updateMachines/Info");
  console.log(JSON.stringify(req.body));
  res.json(req.body);
});



app.listen(3000,()=>console.log("Listening to port 3000"));

