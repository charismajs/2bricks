var mongoose = require('mongoose');

var JobSchema = mongoose.Schema({
    name : {type:String, required:'{PATH} is required!', unique : true},
    command : {type:String, required:'{PATH} is requried!'},
    arguments : [{name:String, description:String}],
    files : [{name:String, binary:Buffer}],
    comments : String,
    createdDate : Date
});

exports.Schema = JobSchema;
exports.defaultValues = [
    {
        name:'ls',
        command:'ls -l',
        arguments:'',
        files:'',
        comments:'file list up',
        createdDate:new Date()
    }
];
