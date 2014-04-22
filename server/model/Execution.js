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

exports.createDefault = function() {
    Execution.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Execution.create(
                {
                    taskId:'ls',
                    arguments:[],
                    start:new Date(),
                    end:new Date(),
                    creator:"It's me.",
                    status:"Terrible",
                    logs:"Finished!"
                });
            Execution.create(
                {
                    taskId:'less',
                    arguments:[],
                    start:new Date(),
                    end:new Date(),
                    creator:"It's me.",
                    status:"Terrible",
                    logs:"Finished!"
                });
        }
    })
};