var mongoose = require('mongoose');

var ExecutionSchema = mongoose.Schema({
    taskId : String,
    start : Date,
    end : Date,
    creator : String,
    status : String,
    logs : String
});

var Execution = mongoose.model('Execution', ExecutionSchema);