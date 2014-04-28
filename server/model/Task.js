var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    jobId : String,
    arguments : [{name:String, value :String}],
    createdDate : Date,
    creator : String
});

exports.Schema = TaskSchema;
exports.defaultValues = [
    {
        jobId:'ls',
        arguments:[],
        createDate:new Date(),
        creator:"It's me."
    },
    {
        jobId:'cat',
        arguments:[],
        createDate:new Date(),
        creator:"It's me."
    }
];

