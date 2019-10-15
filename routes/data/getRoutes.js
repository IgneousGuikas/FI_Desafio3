const con = require('../MySQL.js');
const express = require('express');


var router = express.Router();


router.get('/getData/process', function(req,res,next) {
  console.log("localhost:3000/getData/process");

  con.query("SELECT * FROM logDataProcess", function(err,result,fields) {
    if(err) {
      res.json({dados: []});
    } else {
      res.json({dados: result});
    }
  });

});

router.get('/getData/alarms', function(req,res,next) {
  console.log("localhost:3000/getData/alarms");

  con.query("SELECT * FROM logDataAlarms", function(err,result,fields) {
    if(err) {
      res.json({dados: []});
    } else {
      res.json({dados: result});
    }
  });

});

router.get('/getData/activities', function(req,res,next) {
  console.log("localhost:3000/getData/activities");

  con.query("SELECT * FROM logActivities", function(err,result,fields) {
    if(err) {
      res.json({dados: []});
    } else {
      res.json({dados: result});
    }
  });

});

module.exports = router;
