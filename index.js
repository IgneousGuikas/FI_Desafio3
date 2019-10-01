const express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res)=>res.send("Consegui2!"));

app.listen(3000,()=>console.log("Listening to port 3000"));
