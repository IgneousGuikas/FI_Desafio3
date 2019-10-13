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

  con.query("SELECT IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var ip_exist = false;
    var i;
    for(i=0; i<result.length; i++) {
      if(result[i].IP == req.body.IP) {
        ip_exist = true;
      }
    }

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
      var i;
      for(i=0; i<result.length; i++) {
        if(result[i].IP == req.body.IP) {
          ip_exist = true;
          id_machine = result[i].MACHINEID;
        }
      }

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

