/**
 * Created by kp on 21/04/2014.
 */
var con = require('./constant'),
  mongoose = require('mongoose'),
  jobRouter = require('../router/job'),
  taskRouter = require('../router/task'),
  executionRouter = require('../router/execution');


module.exports = function (express) {

  var router = express.Router();


  // JOB
  router.route('/jobs')
    .post(jobRouter.create)
    .get(jobRouter.list);

  router.route('/jobs/:name')
    .get(jobRouter.get)
    .put(jobRouter.update)
    .delete(jobRouter.delete);

  router.route('/jobs/id/:id')
    .get(jobRouter.get);

  // TASK
  router.route('/tasks')
    .post(taskRouter.create)
    .get(taskRouter.list);

  router.route('/tasks/:id')
    .get(taskRouter.get);


  // EXECUTION
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