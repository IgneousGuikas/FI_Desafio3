const con = require('../MySQL.js');
const express = require('express');


var router = express.Router();


router.get('/getMachines', function(req,res,next) {
  console.log("localhost:3000/getMachines");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) {
      res.json({dados: []});
    } else {
      res.json({dados: result});
    }
  });

});

router.get('/getMachines/ID', function(req,res,next) {
  console.log("localhost:3000/getMachines/ID");

  con.query("SELECT MACHINEID FROM logMachines", function(err,result,fields) {
    if(err) {
      res.json({dados: []});
    } else {
      var temp = [];
      result.forEach(function(value) {
        temp.push(value.MACHINEID);
      });
      res.json({dados: temp});
    }
  });

});

router.get('/getMachines/IP', function(req,res,next) {
  console.log("localhost:3000/getMachines/IP");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) {
      res.send("");
    } else {
      var IP_list = "";
      result.forEach(function(value) {
        IP_list = IP_list + value.IP;
        if(value.MAX_AXIS == null ||
           value.CNC_TYPE == null ||
           value.MT_TYPE == null ||
           value.SERIES == null ||
           value.VERSION == null) {
          IP_list = IP_list + "N";
        }
        IP_list = IP_list + ",";
      });

      res.send(IP_list);
    }
  });

});

module.exports = router;
