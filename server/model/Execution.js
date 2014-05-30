var mongoose = require('mongoose'),
  con = require('../config/constant');

var ExecutionSchema = mongoose.Schema({
  command: String,
  name: String,
  arguments : [{name:String, value :String, description:String}],
  files : [{name:String, content :String, description:String}],
  start: {type: Date},
  end: Date,
  status: {type: String, default: "begin"},
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

ExecutionSchema.methods.success = function (log) {
  this.end = new Date();
  this.log = log;
  this.status = con.status.success;
  return this;
};

ExecutionSchema.methods.failed = function (log, err, next) {
  this.end = new Date();
  this.log = log;
  this.status = con.status.failed;
  this.error = err;

  this.save_async(next);
};

exports.Schema = ExecutionSchema;
