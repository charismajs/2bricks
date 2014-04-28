var mongoose = require('mongoose');

var ExecutionSchema = mongoose.Schema({
    taskId : String,
    command: String,
    start : Date,
    end : Date,
    creator : String,
    status : String,
    log : String,
    error : String
});

ExecutionSchema.statics.create = function (command, taskId, next) {
    var i = new this();

    i.start = new Date();
    i.status = "begin";
    i.command = command;
    i.taskId = taskId;

    i.save_async(next);
};

ExecutionSchema.methods.save_async = function(next) {
    this.save(function(err, doc) {
        if(err !== null) {
            console.log(err);
        }
        else {
            next(doc);
        }
    });
};

ExecutionSchema.methods.success = function(log, next) {
    this.end = new Date();
    this.log = log;
    this.status = 'success';

    this.save_async(next);
};

ExecutionSchema.methods.failed = function(log, err, next) {
    this.end = new Date();
    this.log = log;
    this.status = 'failed';
    this.error = err;

    this.save_async(next);
};

exports.Schema = ExecutionSchema;
exports.defaultValues = [
    {
        taskId:'ls',
        command: 'ls -al /home',
        arguments:[],
        start:new Date(),
        end:new Date(),
        creator:"It's me.",
        status:"Terrible",
        log:"Finished!"
    },
    {
        taskId:'less',
        command: 'less README.md',
        arguments:[],
        start:new Date(),
        end:new Date(),
        creator:"It's me.",
        status:"Terrible",
        log:"Finished!"
    }
];
