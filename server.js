
var express = require('express'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  bodyParser = require('body-parser');

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: '2 bricks unicorns'}));

var config = require('./server/config/config')[env];
require('./server/config/express')( app, config);
require('./server/config/mongoose')(config);

var router = require('./server/config/router')(express);
app.use('/', router);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
