var con = require('../config/constant'),
  mongoose = require('mongoose'),
  Task = mongoose.model(con.model.task),
  baseRouter = require('./base')(Task),
  exeCtrl = require('../controller/executionController');


exports.create = baseRouter.create;
exports.list = baseRouter.list;
exports.get = baseRouter.get;

