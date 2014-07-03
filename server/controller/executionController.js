var con = require('../config/constant'),
  fs = require('fs'),
  child_process = require('child_process'),
  spawn = require('child_process').spawn;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);

// TODO - It is needed 'sudo' at a test environment
var base_command = "su - hdfs";

// Basic Methods
exports.create = baseController.create;
exports.get = baseController.get;
exports.list = baseController.list;


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

var subProcesses = {};
var socket = '';

var sendLog = function(execution, data) {
  if (socket) {
    socket.emit('execution log',
      {
        _id: execution._id,
        log: data
      });
  }
};

var sendExecution = function(execution) {
  socket.emit('execution info', execution);
};

exports.respond = function(socket_io) {
  socket = socket_io;
};

exports.sendExecution = sendExecution;



exports.run = function (execution, next) {

  var applyArgs = function(command, arguments) {
    var cmd = command;
    var args = arguments;
    for (var i = 0; i < args.length; i++){
      cmd = cmd.replace( args[i].name, args[i].value); // TODO - Replace When Perfect matched by Word
    }

    return cmd;
  };

  var runner = function(execution, next, final) {
    var command = applyArgs(execution.executed_command, execution.arguments);
    var stdout = '', stderr = '';

    var cmd = base_command + " <<EOF\n" + command + "\nEOF";

    var cp = spawn('sh', ['-c', cmd]);
    subProcesses[execution._id] = cp;

    cp.stdout.on('data', function (data) {
      sendLog(execution, data.toString());
      execution.append('stdout', data);
    });

    cp.stderr.on('data', function (data) {
      sendLog(execution, data.toString());
      execution.append('stderr', data);
    });

    cp.on('close', function (code) {

      execution.exit_code = code;

      if (code != 0) {
        execution.failed();
      }
      else {
        execution.success();
      }

      if (final) final();

      delete subProcesses[execution._id];
      next(execution);
    });
  };


  if ( execution.files.length > 0 ) {
    var dir = "/tmp/2bricks_" + require('crypto').randomBytes(10).toString('hex');
    var file = execution.files[0].name;
    var fullFile = dir + "/" + file;

    fs.mkdirSync(dir);
    fs.writeFile(fullFile, execution.files[0].content, function(err) {
      //console.log('created a file for ' + fullFile);
      fs.chmodSync(fullFile, 755);
      if (err != null ) {
        console.log(err);
      }
      execution.executed_command = execution.command.replace(file, fullFile);
      runner(execution, next, function() { fs.unlinkSync(fullFile); fs.rmdirSync(dir);});
    });
  }
  else {
    execution.executed_command = execution.command;
    runner(execution, next);
  }
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