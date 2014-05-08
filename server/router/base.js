module.exports = function (model) {
  var base = require('../controller/baseController')(model);

  var functions = {

    create: function (req, res) {
      var data = req.body;
      model.create(data, function (err, result) {
        if (err) {
          res.send(err);
        }

        if (result) {
          res.json(result);
        }

      });
    },

    list: function (req, res) {
      base.list(function (list) {
        if (list == null) {
          res.status(404).json({status: 'Not found '});
        }
        res.json(list);
      });
    },

    get: function (req, res) {
      var id = req.params.id;
      base.get(id, function (data) {
        if (data == null) {
          res.status(404).json({status: 'Not found - ' + id});
        }
        res.json(data);
      });
    }
  };

  return functions;
};
