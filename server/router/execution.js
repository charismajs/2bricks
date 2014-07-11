var con = require('../config/constant'),
  socket = require('../config/socket'),
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

    exeCtrl.run(execution, function (execution) {
      execution.save(function (err, result) {
        socket.sendExecution(result);
        res.send(result);
      });
    });
  });
};

exports.delete = function (req, res) {
  var id = req.params.id;
  exeCtrl.kill(id, function(execution) {
    execution.save(function (err, result) {
      socket.sendExecution(result);
      res.send(result);
    });
  });
};





