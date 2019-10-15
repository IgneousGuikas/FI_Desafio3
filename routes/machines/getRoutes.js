const con = require('../MySQL.js');
const express = require('express');

var router = express.Router();

router.get('/getIPs', function(req,res,next) {
  console.log("localhost:3000/getIPs");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) res.send("");

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

  });

});

router.get('/getMachines', function(req,res,next) {
  console.log("localhost:3000/getMachines");

  con.query("SELECT * FROM logMachines", function(err,result,fields) {
    if(err) res.json({dados: []});

    res.json({dados: result});

  });

});

module.exports = router;
