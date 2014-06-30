var con = require('../config/constant'),
  mongoose = require('mongoose'),
  Execution = mongoose.model(con.model.execution),
  baseRouter = require('./base')(con.model.execution),
  exeCtrl = require('../controller/executionController');


exports.create = baseRouter.create;
exports.list = baseRouter.list;
exports.get = baseRouter.get;


exports.run = function (req, res) {
  baseRouter.run(req, res, function(execution) {
    execution.run().save();

    exeCtrl.run(execution, function(code){
      if (code != 0) {
        execution.failed().save(function(err, result) {
          exeCtrl.sendExecution(execution);
          res.send(result);
        });
      }
      else {
        execution.success().save(function (err, result) {
          exeCtrl.sendExecution(execution);
          res.send(result);
        });
      }
    });
  });
};



