/**
 * Created by kp on 21/04/2014.
 */
var jobController = require('../controller/jobController');
var mongoose = require('mongoose');

module.exports = function(express){

    var router = express.Router();

    var Task = mongoose.model('Task');
    var taskController = require('../controller/baseController')(Task);

    var Execution = mongoose.model('Execution');
    var exeController = require('../controller/baseController')(Execution);

    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next();
    });

    // JOB CRUD
    router.route('/jobs')
        .post(jobController.create)
        .get(jobController.getList);

    router.route('/jobs/:name')
        .get(jobController.getOverHttp)
        .put(jobController.update)
        .delete(jobController.delete);

    // TASK CRUD
    router.route('/tasks')
        .post(taskController.create)
        .get(taskController.getList);

    router.route('/tasks/:id')
        .get(taskController.getOverHttp);

    // EXECUTION CRUD
    router.route('/executions')
        // TODO - before call create, we should set default values using model's fn
        .post(exeController.create)
        .get(exeController.getList);

    router.route('/executions/:id')
        .get(exeController.getOverHttp);


    // Partial Views
    router.route('/partials/*')
        .get( function (req, res) {
            res.render('../../public/app/' + req.params[0]);
        });

    router.route('/')
        .get(function(req, res) {
            res.render('index');
        });

    return router;
};