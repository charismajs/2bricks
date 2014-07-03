var mongoose = require('mongoose'),
  con = require('../config/constant');

var ExecutionSchema = mongoose.Schema({
  command: String,
  executed_command: String,
  name: String,
  arguments : [{name:String, value :String, description:String}],
  files : [{name:String, content :String, description:String}],
  start: Date,
  end: Date,
  status: {type: String, default: "init"},
  exit_code: Number,
  comment: {type: String, default : ''},
  stderr: {type: String, default: ''}, // err
  stdout: {type: String, default: ''} // out
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

ExecutionSchema.methods.append = function(name, text) {
  this[name] = this[name].concat(text);
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

ExecutionSchema.methods.failed = function () {
  this.end = new Date();
  this.status = con.status.failed;
  return this;
};

exports.Schema = ExecutionSchema;
