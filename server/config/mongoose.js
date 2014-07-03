var mongoose = require('mongoose'),
  con = require('../config/constant'),
  job = require('../model/Job'),
  task = require('../model/Task'),
  execution = require('../model/Execution');

module.exports = function(config) {

  mongoose.disconnect();
  mongoose.connect(config.db);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error ....'));

  // Clear for re-test
  mongoose.models = {};
  mongoose.modelSchemas = {};

  mongoose.model(con.model.job, job.Schema);
  mongoose.model(con.model.task, task.Schema);
  mongoose.model(con.model.execution, execution.Schema);

  return mongoose;
};


