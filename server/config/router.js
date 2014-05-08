/**
 * Created by kp on 21/04/2014.
 */
var con = require('./constant'),
  mongoose = require('mongoose'),
  jobRouter = require('../router/job'),
  taskRouter = require('../router/task'),
  executionRouter = require('../router/execution'),
  jobController = require('../controller/jobController');


module.exports = function (express) {

  var router = express.Router();


  // JOB CRUD
  router.route('/jobs')
    .post(jobController.create)
    .get(jobController.list);

  router.route('/jobs/:name')
    .get(jobController.get)
    .put(jobController.update)
    .delete(jobController.delete);

  // TASK CRUD
  router.route('/tasks')
    .post(taskRouter.create)
    .get(taskRouter.list);

  router.route('/tasks/:id')
    .get(taskRouter.get);


  // EXECUTION CRUD
  router.route('/executions')
    .post(executionRouter.run)
    .get(executionRouter.list);

  router.route('/executions/:id')
    .get(executionRouter.get);



  // Partial Views
  router.route('/partials/*')
    .get(function (req, res) {
      res.render('../../public/app/' + req.params[0]);
    });

  router.route('/')
    .get(function (req, res) {
      res.render('index');
    });

  return router;
};