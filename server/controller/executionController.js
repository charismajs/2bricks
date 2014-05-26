var sys = require('sys'),
  con = require('../config/constant'),
  fs = require('fs'),
  Q = require('q'),
  exec = require('child_process').exec;

var mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  Execution = mongoose.model(con.model.execution);

var baseController = require('../controller/baseController')(Execution);

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


var tempDirectory = function (job, task) {
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



exports.run = function (execution, next) {
  // 1. Check files
  // 2. Write the file
  // 3. Replacing command
  // 4. Execute
  // 5. Remove temp folder
  // 6. return result of executor

  console.log('at run');

//  var promiseWritter = function (file, content) {
//    var deferred = Q.defer();
//    fs.writeFile(file, content, deferred.resolve);
//    return deferred.promise;
//  };
//
//  var promiseChild = function(command) {
//    child = exec(command, function (error, stdout, stderr) {
//      var deferred = Q.defer();
//
//      if (error !== null) {
//        stdout = error;
//        console.log('exec error: ' + error);
//      }
//
//      deferred.resolve(stdout);
//
//      return deferred.promise;
//    });
//
//  };
//
//  if ( execution.files.length > 0 ) {
//    var dir = "/tmp/2bricks_" + random();
//    var file = dir + "/" + execution.files[0].name;
//    var content = execution.files[0].content;
//
//    promiseWritter(file, content).then(function(err){
//      // Error for writting
//
//    }).then(function() {
//      // Replacing command
//      var args = execution.arguments;
//      var command = execution.command;
//      for (var i=0; i<args.length; i++){
//        command = command.replace( args[i].name, args[i].value); // TODO - Replace When Perfect matched by Word
//      }
//      return command;
//    }).then(function(command) {
//      promiseChild(command).then( function(log) {
//        fs.rmdir(dir)
//        return log;
//      })
//    }).then(function(log) {
//      next(log);
//    }).catch(console.log);
//  }


  var runner = function(execution) {
    var command = execution.command;
    var args = execution.arguments;
    for (var i=0; i<args.length; i++){
      command = command.replace( args[i].name, args[i].value); // TODO - Replace When Perfect matched by Word
    }

    child = exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        stdout = error;
        console.log('exec error: ' + error);
      }
      fs.rmdir(dir);
      return next(stdout);
    });
  };

  if ( execution.files.length > 0 ) {
    var dir = "/tmp/2bricks_" + require('crypto').randomBytes(10).toString('hex');
    var file = execution.files[0].name;
    var fullfile = dir + "/" + file;

    fs.mkdir(dir);
    fs.writeFile(fullfile, execution.files[0].content, function(err) {
      if (err != null ) {
        console.log(err);
      }
      console.log('Writing file to ' + file);
      execution.command = execution.command.replace(file, fullfile);
      runner(execution);
    });
  }
  else {
    runner(execution);
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
