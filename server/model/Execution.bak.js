var mongoose = require('mongoose'),
  con = require('../config/constant');

var ExecutionSchema = mongoose.Schema({
  taskId: String,
  command: String,
  start: {type: Date},
  end: Date,
  creator: String,
  status: {type: String, default: "begin"},
  log: String,
  error: String
});


ExecutionSchema.statics.ignite = function (data) {
  var prom = new mongoose.Promise();
  setTimeout(function () {
    prom.resolve(null, 'Execution');
  } , 500);
  return prom;
};

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
exports.defaultValues = [
  {
    //taskId: 'ls',
    command: 'ls -al /home',
    arguments: [],
    start: new Date(),
    end: new Date(),
    creator: "It's me.",
    status: con.status.start,
    log: "Finished!"
  },
  {
    //taskId: 'less',
    command: 'less README.md',
    arguments: [],
    start: new Date(),
    end: new Date(),
    creator: "It's me.",
    status: con.status.failed,
    log: "Finished!"
  }
];
