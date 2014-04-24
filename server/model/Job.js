var mongoose = require('mongoose');

var JobSchema = mongoose.Schema({
    name : {type:String, required:'{PATH} is required!', unique : true},
    command : {type:String, required:'{PATH} is requried!'},
    arguments : [{name:String, description:String}],
    files : [{name:String, binary:Buffer}],
    comments : String,
    createdDate : Date
});

var Job = mongoose.model('Job', JobSchema);

exports.createDefaultJob = function() {
    Job.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Job.create({name:'ls', command:'ls -l', arguments:'', files:'', comments:'file list up', createdDate:new Date()})
        }
    })
};