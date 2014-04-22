var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    jobId : String,
    arguments : [{name:String, value :String}],
    createdDate : Date,
    creator : String
});

var Task = mongoose.model('Task', TaskSchema);

exports.createDefault = function() {
    Task.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Task.create(
                {
                    jobId:'ls',
                    arguments:[],
                    createDate:new Date(),
                    creator:"It's me."
                });
            Task.create(
                {
                    jobId:'cat',
                    arguments:[],
                    createDate:new Date(),
                    creator:"It's me."
                });
        }
    })
};