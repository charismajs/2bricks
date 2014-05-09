var con = require('../config/constant'),
  mongoose = require('mongoose'),
  baseRouter = require('./base')(con.model.task);


exports.create = baseRouter.create;
exports.list = baseRouter.list;
exports.get = baseRouter.get;

