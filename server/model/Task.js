var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    jobId : String,
    arguments : [{name:String, value :String}],
    createdDate : Date,
    creator : String
});

var Task = mongoose.model('Task', TaskSchema);