var mongoose = require('mongoose'),
    jobModel = require('../model/Job');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error ....'));
    db.once('open', function callback() {
        console.log('2 Bricks db opened');
    });
}

jobModel.createDefaultJob();