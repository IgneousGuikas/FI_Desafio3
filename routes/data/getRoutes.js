const con = require('../MySQL.js');
const express = require('express');


var router = express.Router();


router.get('/getData/process', function(req,res,next) {
  console.log("localhost:3000/getData/process");

  con.query("SELCT * FROM logDataProcess", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

router.get('/getData/alarms', function(req,res,next) {
  console.log("localhost:3000/getData/alarms");

  con.query("SELCT * FROM logDataAlarms", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

router.get('/getData/activities', function(req,res,next) {
  console.log("localhost:3000/getData/activities");

  con.query("SELCT * FROM logActivities", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

module.exports = router;
