var mongoose = require('mongoose');

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
          res.json(entity);
        }
      });
    },

    list: function (req, res) {
      base.list(function (list) {
        if (list == null) {
          res.status(404).json({message: 'Not found '});
        }
        res.json(list);
      });
    },

    get: function (req, res, condition) {
      var id = req.params.id;
      condition
      base.get(condition, function (data) {
        if (data == null) {
          res.status(404).json({message: 'Not found - ' + id});
        }
        res.json(data);
      });
    }
  };

  return functions;
};
