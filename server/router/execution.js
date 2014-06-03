var con = require('../config/constant'),
  mongoose = require('mongoose'),
  Execution = mongoose.model(con.model.execution),
  baseRouter = require('./base')(con.model.execution),
  exeCtrl = require('../controller/executionController');

exports.run = function (req, res) {
  var data = req.body;
  Execution.create(data, function(err, execution) {
    exeCtrl.run(execution, function(err, log){

//      console.log('Error : ' + err);
//      console.log('Log : ' + log);

      if (err) {
        execution.failed(err).save(function(err, result) {
          res.send(result);
        })
      }
      else {
        execution.success(log).save(function (err, result) {
          res.send(result);
        });
      }
    });
  });
};

exports.list = baseRouter.list;
exports.get = baseRouter.get;

