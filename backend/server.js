
const express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./db');



var watchlist =[
    {name: "Microsoft", symbol: "MSFT"},
    {name: "Verizon Communications", symbol: "VZ"}
]

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database connection established')},
    err => {console.log('Issues connecting to database... '+ err)}
);

const app = express();

app.use(cors());
app.use(bodyParser());
var server = app.listen(3000, listening);

function listening(){
    console.log('server listening...')
}

app.get('/watchlist', (request, response) =>{
    response.send(watchlist)
});