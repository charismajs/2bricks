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

    exeCtrl.run(execution, function(err, log){
      if (err) {
        execution.failed(err).save(function(err, result) {
          res.send(result);
        });
      }
      else {
        execution.success(log).save(function (err, result) {
          res.send(result);
        });
      }
    });
  });
};



