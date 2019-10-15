const con = require('../MySQL.js');
const express = require('express');


var router = express.Router();


router.post('/updateData/process', function(req,res,next) {
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

router.post('/updateData/alarms', function(req,res,next) {
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

router.post('/updateData/activities', function(req,res,next) {
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

module.exports = router;
