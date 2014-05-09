var con = require('../config/constant'),
  mongoose = require('mongoose'),
  baseRouter = require('./base')(con.model.job),
  jobCtrl = require('../controller/jobController');

exports.create = baseRouter.create;
exports.list = baseRouter.list;

exports.get = function (req, res) {
  jobCtrl.get(req.params.name, function (job) {
    if (job) {
      res.json(job);
    }
    res.status(404).json({message: con.message.not_found});
  })
};


exports.update = function (req, res) {
  var data = req.body;
  jobCtrl.update(req.params.name, data, function (saved) {
    if (saved)
      res.json(saved);
  })
};

exports.delete = function (req, res) {
  jobCtrl.get(req.params.name, function (job) {
    if (job) {
      job.remove(function (err, deleted) {
        if (err) return handleError(err);
        res.json({message: con.message.delete + deleted.name});
      });
    }
    else {
      res.status(404).json({message: con.message.not_found});
    }
  });
};




