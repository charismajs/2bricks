var mongoose = require('mongoose'),
    job = require('../model/Job'),
    task = require('../model/Task'),
    execution = require('../model/Execution');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error ....'));
    db.once('open', function callback() {
        console.log('2 Bricks db opened');
    });
}

var jobModel = mongoose.model('Job', job.Schema);
var taskModel = mongoose.model('Task', task.Schema);
var executionModel = mongoose.model('Execution', execution.Schema);

createDefault(jobModel, job.defaultValues);
createDefault(taskModel, task.defaultValues);
createDefault(executionModel, execution.defaultValues);

function createDefault(model, defaults) {
    model.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            for( var i in defaults) {
                (new model(defaults[i])).save();
            }
        }
    });
};

