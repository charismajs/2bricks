var mongoose = require('mongoose'),
  con = require('../config/constant');

module.exports = function (modelname) {
  var model = mongoose.model(modelname);
  var base = require('../controller/baseController')(model);

  var functions = {

    create: function (req, res) {
      var data = req.body;
      base.create(data, function (err, entity) {
        if (err) {
          res.status(400).send({message: err.toString()});
        }
        else {
          console.log('before next');
          res.json(entity);
        }
      });
    },

    list: function (req, res) {
      base.list(function (list) {
        if (list == null) {
          res.status(404).json({message: 'Not found '});
        }
        else {
          res.json(list);
        }
      });
    },

    get: function (req, res) {
      var condition = req.params.id ? {_id:req.params.id} : {name:req.params.name};
      base.get(condition, function (err, data) {
        if (data == null) {
          res.status(404).json({message: con.message.not_found});
        }
        else {
          res.json(data);
        }
      });
    },

    run: function(req, res, next) {
      var condition = req.params.id ? {_id:req.params.id} : {name:req.params.name};
      base.get(condition, function (err, data) {
        if (data == null) {
          res.status(404).json({message: con.message.not_found});
        }
        else {
          if (next) {
            next(data);
          }
          else {
            res.json(data);
          }
        }
      });
    }

  };

  return functions;
};
