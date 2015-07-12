var express = require('express');
var path = require('path');

var routes = require('./src/routes');
var middlewares = require('./src/middlewares');
var errorHandler = require('./src/middlewares/error');

var app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

middlewares(app);
routes(app);
errorHandler(app);

module.exports = app;
