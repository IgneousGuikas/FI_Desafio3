const con = require('../MySQL.js');
const express = require('express');


var router = express.Router();


router.post('/updateMachines/add', function(req,res,next) {
  console.log("localhost:3000/updateMachines/add");

  con.query("SELECT IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var ip_exist = false;
    result.forEach(function(value) {
      if(value.IP == req.body.IP) {
        ip_exist = true;
      }
    });

    if(ip_exist) {
      res.send("Este IP já existe.");
    } else {

      con.query("INSERT INTO logMachines (IP) VALUES (\"" + req.body.IP + "\")", function(err) {
        if(err) throw err;
      });

      res.send("O IP \"" + req.body.IP + "\" foi adicionado com sucesso.");

    }

  });

});

router.post('/updateMachines/del', function(req,res,next) {
  console.log("localhost:3000/updateMachines/del");

  con.query("SELECT MACHINEID,IP FROM logMachines", function(err,result,fields) {
    if(err) throw err;

    var ip_exist = false;
    var id_machine;
    result.forEach(function(value) {
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
      con.query("DELETE FROM logMachines WHERE MACHINEID = " + id_machine, function(err) {
        if(err) throw err;
      });

      res.send("O IP \"" + req.body.IP + "\" foi deletado com sucesso.");

    } else {
      res.send("Este IP não existe.");
    }

  });

});

router.post('/updateMachines/info', function(req,res,next) {
  console.log("localhost:3000/updateMachines/info");

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

module.exports = router;
