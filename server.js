
var express = require('express'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.use(bodyParser());

var config = require('./server/config/config')[env];

require('./server/config/express')( app, config);

require('./server/config/mongoose')(config);

//require('./server/config/routes')(app);

var router = express.Router();

router.route('/job')
    .post(require('./server/controller/jobcontroller').createJob);
router.route('/job/:name')
    .get(require('./server/controller/jobcontroller').getJob);

app.use('/', router);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
