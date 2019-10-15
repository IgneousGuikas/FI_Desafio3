const express = require('express');

const machinesGetRoutes = require('./routes/machines/getRoutes.js');
const machinesPostRoutes = require('./routes/machines/postRoutes.js');
const dataGetRoutes = require('./routes/data/getRoutes.js');
const dataPostRoutes = require('./routes/data/postRoutes.js');

var app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(machinesGetRoutes);
app.use(machinesPostRoutes);
app.use(dataGetRoutes);
app.use(dataPostRoutes);


app.listen(3000,()=>console.log("Listening to port 3000"));

