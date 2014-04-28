var sys = require('sys'),
    exec = require('child_process').exec;

var mongoose = require('mongoose'),
    jobModel = require('../model/Job'),
    taskModel = require('../model/Task'),
    Task = mongoose.model('Task');

var replace = function(job, task) {
    var command = job.command;

    for ( var j in task.arguments) {
        // TODO - Replace When Perfect matched by Word
        command = command.replace(
            task.arguments[j].name,
            task.arguments[j].value
        );
    }

    return command;
}

exports.replace = replace;
exports.getCommand = function(taskId, next) {
    var jobController = require('./jobController');
    var taskController = require('./baseController')(Task);

    taskController.get(taskId, function(task) {
        if (task != null) {
            jobController.get(task.jobId, function(job) {
                if (job != null) {
                    var command = replace(job, task);
                    next(command);
                }
            });
        }
    });
};

exports.run = function(cmd, next) {
    child = exec( cmd, function(error, stdout, stderr) {
//        sys.print('stdout: ' + stdout);
//        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        return next(stdout);
    });
};
