var con = require('../config/constant'),
  soc = require('../config/socket'),
  fs = require('fs'),
  cp = require('child_process'),
  spawn = cp.spawn;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);


var base_command = "su - hdfs"; // use a root account at test environment

exports.create = baseController.create;
exports.get = baseController.get;
exports.list = baseController.list;

var runningExecutions = {};


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

var psTree = require('ps-tree');

var kill = function (pid, signal, callback) {

  signal = signal || 'SIGKILL';
  callback = callback || function () {};

  var killTree = true;

//  cp.exec("kill -9 " + processing.pid, function (error, stdout, stderr) {
//    // console.log('stdout: ' + stdout);
//    // console.log('stderr: ' + stderr);
//    // if(error !== null) {
//    //      console.log('exec error: ' + error);
//    // }
//  });

  if (killTree) {
    psTree(pid, function (err, children) {
      [pid].concat(
        children.map(function (p) {
          return p.PID;
        })
      ).forEach(function (tpid) {
          try {
            console.log('CP : ' + tpid);
            process.kill(tpid, signal)
          }
          catch (ex) {
          }
        });
      callback();
    });
  } else {
    try {
      process.kill(pid, signal)
    }
    catch (ex) {
    }
    callback();
  }
};

exports.kill = function(id, next) {
  console.log('killing - ' + runningExecutions[id] );

  var pid = runningExecutions[id].cp.pid;
  var execution = runningExecutions[id].exe;
  delete runningExecutions[id];

  execution.kill();
  console.log('-- killing' + ' : ' + execution.status);
  kill(pid);
  next(execution);
};

exports.run = function (execution, next) {
  var runner = function (execution, next, final) {
    var command = exports.replace(execution.executed_command, execution.arguments);
    var stdout = '', stderr = '';

    var cmd = base_command + " <<EOF\n" + command + "\nEOF";

    var cp = spawn('sh', ['-c', cmd]);
    runningExecutions[execution._id] = { "cp" : cp , "exe" : execution };

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
    });

    cp.on('close', function (code) {

      execution.exit_code = code;

      if (code == 0) {
        console.log('-- success');
        execution.success();
      } else if (execution.status != con.status.killed) {
        console.log('-- failed' + ' : ' + execution.status);
        execution.failed();
      } else {
        // failed
        console.log('-- killed');
      }

      if (final) final();

      delete runningExecutions[execution._id];
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
