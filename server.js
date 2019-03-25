var express = require('express');
var app = express();
require('dotenv').config()
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
global.jsonParser = bodyParser.json();
global.jwt = require('jwt-simple');
global.moment = require('moment');
global._ = require('underscore');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization, Access-Control-Allow-Headers");
    next();
});
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

global.models = require('./models');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/MobileAPI', require('./controllers/MobileAPI'));

var port = process.env.PORT || 8080;

server.listen(port, function () {
    console.log('listening on *:' + port);
});


module.exports = app;