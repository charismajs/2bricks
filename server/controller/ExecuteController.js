var sys = require('sys'),
  con = require('../config/constant'),
  exec = require('child_process').exec;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);

// Basic Methods
exports.create = baseController.create;
exports.getOverHttp = baseController.getOverHttp;
exports.getList = baseController.getList;


// Private Methods
var replaceCommandText = function (job, task) {
  var command = job.command;

  for (var j in task.arguments) {
    // TODO - Replace When Perfect matched by Word
    command = command.replace(
      task.arguments[j].name,
      task.arguments[j].value
    );
  }

  return command;
};

var _run = function (cmd, next) {
  child = exec(cmd, function (error, stdout, stderr) {
//        sys.print('stdout: ' + stdout);
//        sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
//            execution.failed(stdout, error);
    }
//        execution.success(stdout);
    return next(stdout);
  });
};

exports.replace = replaceCommandText;
exports.getCommand = function (taskId, next) {

  var jobController = require('./jobController');
  var taskController = require('./baseController')(Task);

  taskController.get(taskId, function (task) {
    if (task != null) {
      jobController.get(task.jobId, function (job) {
        if (job != null) {
          var command = replaceCommandText(job, task);
          next(command);
        }
      });
    }
  });
};

exports.run = _run;

exports.runOverHttp = function (req, res, next) {
  var data = req.body;
  Execution.create(data, function(err, exe) {
    _run(exe.command, function(log){
      exe.success(log).save(function(err, result) {
        res.send(result);
      });
    });
  });
};