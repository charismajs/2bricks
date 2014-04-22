/**
 * Created by kp on 21/04/2014.
 */

var mongoose = require('mongoose'),
    Job = mongoose.model('Job');

// TODO
// CRUD
exports.createJob = function(req, res, next) {
    var jobData = req.body;

    Job.create(jobData, function(err, job) {
        if (err) {
            console.log(err);

            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Job Name');
            }

            res.status(400);
            return res.send({reason:err.toString()});
        }

        res.send(job);
    })
}

exports.getJob = function(req, res, next) {
    var id = req.param('id');

    Job.findOne({name: req.params.name}).exec( function (err, job) {
        if (job == null) {
            res.status(404).json({status:'Not found job.'});
        }
        res.json(job);
    });
}
