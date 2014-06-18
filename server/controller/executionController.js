var con = require('../config/constant'),
  fs = require('fs'),
  spawn = require('child_process').spawn,
  exec = require('child_process').exec;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);

var base_command = "su - hdfs -c";

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

var socket = '';

var sendLog = function( execution, data) {
    socket.emit('execution log',
      {
        _id: execution._id,
        log: data
      });
  };

exports.run = function (execution, next) {

  var applyArgs = function(command, arguments) {
    var cmd = command;
    var args = arguments;
    for (var i = 0; i < args.length; i++){
      cmd = cmd.replace( args[i].name, args[i].value); // TODO - Replace When Perfect matched by Word
    }

    return cmd;
  };


  var runner = function(command, next, final) {
    var hdfs_command = base_command.replace('$command', command);
    var command_array = base_command.split(/\s/);
    var args = command_array.splice(1);
    args.push("'" + command + "'");

    var cp = spawn(command_array[0], args);

    var stdout = '', stderr = '';
    cp.stdout.on('data', function (data) {
      stdout = stdout.concat(data);
      // TODO - Add emit for Socket.io
      //console.log('stdout: ' + data);

      sendLog(execution, data);

      execution.setLog(stdout).save();
    });

    cp.stderr.on('data', function (data) {
      stderr = stderr.concat(data);
    });

    cp.on('close', function (code) {
      if (final)
        final();

      next(stderr, stdout);
    });
  };

  var cmd = applyArgs(execution.command, execution.arguments);

  if ( execution.files.length > 0 ) {
    var dir = "/tmp/2bricks_" + require('crypto').randomBytes(10).toString('hex');
    var file = execution.files[0].name;
    var fullFile = dir + "/" + file;

    fs.mkdirSync(dir);
    fs.writeFile(fullFile, execution.files[0].content, function(err) {
      console.log('created a file for ' + fullFile);
      fs.chmodSync(fullFile, 755);
      if (err != null ) {
        console.log(err);
      }
      cmd = cmd.replace(file, fullFile);
      runner(cmd, next, function() { fs.unlinkSync(fullFile); fs.rmdirSync(dir);});
    });
  }
  else {
    runner(cmd, next);
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
