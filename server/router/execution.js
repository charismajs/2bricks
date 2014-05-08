var con = require('../config/constant'),
  mongoose = require('mongoose'),
  Execution = mongoose.model(con.model.execution),
  baseRouter = require('./base')(Execution),
  exeCtrl = require('../controller/executionController');

// TODO - Change a function name from 'runOverHttp' to 'run'
exports.run = function (req, res) {
  var data = req.body;
  Execution.create(data, function(err, execution) {
    exeCtrl.run(execution.command, function(log){
      execution.success(log).save(function(err, result) {
        res.send(result);
      });
    });
  });
};

exports.list = baseRouter.list;
exports.get = baseRouter.get;

