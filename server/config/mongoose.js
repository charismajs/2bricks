var mongoose = require('mongoose'),
    jobModel = require('../model/Job'),
    taskModel = require('../model/Task'),
    executionModel = require('../model/Execution');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error ....'));
    db.once('open', function callback() {
        console.log('2 Bricks db opened');
    });
}

jobModel.createDefaultJob();
taskModel.createDefault();
executionModel.createDefault();