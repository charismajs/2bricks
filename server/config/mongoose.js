var mongoose = require('mongoose'),
  con = require('../config/constant'),
  job = require('../model/Job'),
  task = require('../model/Task'),
  execution = require('../model/Execution');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error ....'));
};

var jobModel = mongoose.model(con.model.job, job.Schema);
var taskModel = mongoose.model(con.model.task, task.Schema);
var executionModel = mongoose.model(con.model.execution, execution.Schema);
