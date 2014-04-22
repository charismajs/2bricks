/**
 * Created by kp on 21/04/2014.
 */

var mongoose = require('mongoose'),
    Job = mongoose.model('Job');



exports.create = function(req, res, next) {
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

exports.getList = function(req, res, next) {
    Job.find(function (err, joblist) {
        if (err)
            res.send(err);

        res.json(joblist);
    })
}

exports.get = function(req, res, next) {
    Job.findOne({name: req.params.name}).exec( function (err, job) {
        if (job == null) {
            res.status(404).json({status:'Not found job.'});
        }
        res.json(job);
    });
}

exports.update = function(req, res, next) {
    var newJob = req.body;

    Job.findOne({name: req.params.name}).exec( function(err, job) {
        if (err)
            res.send(err);

        job.command = newJob.command;
        job.arguments = newJob.arguments;
        job.files = newJob.files;
        job.comments = newJob.comments;
        job.createdDate = new Date();

        job.save(function(err) {
            if (err)
                res.send(err);

            res.json({status: 'update', data: job});
        });
    });
};

exports.delete = function(req, res, next) {
    Job.remove({name:req.params.name}, function(err, job) {

        if (err)
            res.send(err);

        res.json({status: 'deleted', data: req.params.name});
    });
}



