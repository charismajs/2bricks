/**
 * Created by kp on 21/04/2014.
 */

var mongoose = require('mongoose'),
  con = require('../config/constant'),
  Job = mongoose.model(con.model.job);


exports.create = function (req, res, next) {
  var jobData = req.body;

  Job.create(jobData, function (err, job) {
    if (err) {
      console.log(err);

      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Job Name');
      }

      res.status(400);
      return res.send({reason: err.toString()});
    }

    res.send(job);
  })
}


exports.update = function(name, data, next){
  Job.findOne({name: name}).exec(function (err, job) {

    var newJob = new Job(data);

    // TODO - Refactoring UPDATE  job.update(newJob), job.update(json)

    job.command = newJob.command;
    job.arguments = newJob.arguments;
    job.files = newJob.files;
    job.comments = newJob.comments;
    job.createdDate = new Date();

    job.save(function (err, saved) {

      if (saved)
        next(saved);
    });
  });
}


exports.get = function (jobId, next) {
  Job.findOne({name: jobId}).exec(function (err, job) {
    if (err)
      throw err;

    next(job);
  });
};

