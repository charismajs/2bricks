/**
 * Created by kp on 21/04/2014.
 */
var jobController = require('../controller/jobcontroller');

module.exports = function(express){

    var router = express.Router();

    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next();
    });

    router.route('/job')
        .post(jobController.createJob);

    router.route('/job/:name')
        .get(jobController.getJob);

    router.route('/')
        .get(function(req, res) {
            res.render('index');
        });

    return router;
};