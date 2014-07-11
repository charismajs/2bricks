var con = require('../config/constant'),
  soc = require('../config/socket'),
  fs = require('fs'),
  spawn = require('child_process').spawn;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);


var base_command = "su - hdfs"; // use a root account at test environment

exports.create = baseController.create;
exports.get = baseController.get;
exports.list = baseController.list;

var subProcesses = {};


exports.replace= function(command, arguments) {
  var cmd = command;
  var args = arguments;

  for (var i = 0; i < args.length; i++) {
    if (args[i].name) {
      var target = args[i].name.replace("$", "\\$"); // may be needed to add more special characters at regex
      var reg = new RegExp("(\\s)" + target + "(\\s|$)");
      cmd = cmd.replace(reg, "$1" + args[i].value + "$2");
    }
  }
  return cmd;
};

exports.kill = function(id, next) {
  console.log('killing - ' + subProcesses[id] );

  subProcesses[id].kill('SIGKILL');
  delete subProcesses[id];

  exports.get({"_id" : id}, function (err,execution) {
    execution.kill();
    next(execution);
  });
};

exports.run = function (execution, next) {
  var runner = function (execution, next, final) {
    var command = exports.replace(execution.executed_command, execution.arguments);
    var stdout = '', stderr = '';

    var cmd = base_command + " <<EOF\n" + command + "\nEOF";

    var cp = spawn('sh', ['-c', cmd]);
    subProcesses[execution._id] = cp;

    cp.stdout.on('data', function (data) {
      soc.sendLog(execution, data.toString());
      execution.append('stdout', data);
    });

    cp.stderr.on('data', function (data) {
      soc.sendLog(execution, data.toString());
      execution.append('stderr', data);
    });

    cp.on('exit', function (code) {
      console.log('parent: ' + process.pid + ' , child: ' + this.pid);
      process.kill(this.pid);
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


  if (execution.files.length > 0) {
    var dir = "/tmp/2bricks_" + require('crypto').randomBytes(10).toString('hex');
    var file = execution.files[0].name;
    var fullFile = dir + "/" + file;

    fs.mkdirSync(dir);
    fs.writeFile(fullFile, execution.files[0].content, function (err) {
      fs.chmodSync(fullFile, 755);
      if (err != null) {
        console.log(err);
      }
      execution.executed_command = execution.command.replace(file, fullFile);
      runner(execution, next, function () {
        fs.unlinkSync(fullFile);
        fs.rmdirSync(dir);
      });
    });
  }
  else {
    execution.executed_command = execution.command;
    runner(execution, next);
  }
};
