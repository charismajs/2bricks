var mongoose = require('mongoose'),
    jobModel = require('../model/Job'),
    taskModel = require('../model/Task'),
    Task = mongoose.model('Task');

exports.getCommand = function(taskId, next) {
    var jobController = require('./jobController');
    var taskController = require('./baseController')(Task);

    taskController.get(taskId, function(data) {
        if (data != null) {
            jobController.get(data.jobId, function(job) {
                if (job != null) {
                    next(job.command);
                }
            });
        }
    });
};