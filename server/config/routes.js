/**
 * Created by kp on 21/04/2014.
 */

var jobController = require('../controller/jobcontroller');

module.exports = function(app) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/job/:name', jobController.getJob);
    app.put('/job', jobController.createJob);
};