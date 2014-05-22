var mongoose = require('mongoose'),
  con = require('../config/constant'),
  job = require('../model/Job'),
  task = require('../model/Task'),
  execution = require('../model/Execution');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error ....'));
//    db.once('open', function callback() {
//    });
};

var jobModel = mongoose.model(con.model.job, job.Schema);
var taskModel = mongoose.model(con.model.task, task.Schema);
var executionModel = mongoose.model(con.model.execution, execution.Schema);

//createDefault(jobModel, job.defaultValues);
//createDefault(taskModel, task.defaultValues);
//createDefault(executionModel, execution.defaultValues);

function createDefault(model, defaults) {
  model.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      for( var i in defaults) {
        (new model(defaults[i])).save();
      }
    }
  });
};

