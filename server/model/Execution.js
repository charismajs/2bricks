var mongoose = require('mongoose'),
  con = require('../config/constant');

var ExecutionSchema = mongoose.Schema({
  command: String,
  name: String,
  arguments : [{name:String, value :String, description:String}],
  files : [{name:String, content :String, description:String}],
  start: {type: Date},
  end: Date,
  status: {type: String, default: "init"},
  comment: String,
  log: String
});

ExecutionSchema.methods.save_async = function (next) {
  this.save(function (err, doc) {
    if (err !== null) {
      console.log(err);
    }
    else {
      if (next)
        next(doc);
    }
  });
};

ExecutionSchema.methods.setLog = function(log) {
  this.log = log;
  return this;
};

ExecutionSchema.methods.run = function(log) {
  this.start = new Date();
  this.log = log;
  this.status = con.status.start;
  return this;
};

ExecutionSchema.methods.success = function () {
  this.end = new Date();
  this.status = con.status.success;
  return this;
};

ExecutionSchema.methods.failed = function (log) {
  this.end = new Date();
  this.log = log;
  this.status = con.status.failed;
  return this;
};

exports.Schema = ExecutionSchema;
