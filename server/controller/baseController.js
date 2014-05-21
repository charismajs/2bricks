/**
 * Created by kp on 21/04/2014.
 */

module.exports = function (model) {
  var result = {
    create: function(data, next) {
      model.create(data, function(err, entity) {

        if (err) {
          if (err.toString().indexOf('E11000') > -1) {
            err = new Error('Duplicate Exception at ' + model.constructor.modelName);
          }
        }

        next(err, entity);
      });
    },
    list: function (next) {
      model.find(function (err, list) {
        if (err)
          throw err;

        if (next)
          next(list);
        else
          return list;
      })
    },

    get: function (condition, next) {
      model.findOne(condition).exec(function (err, data) {
        next(err, data);
      });
    }
  };

// TODO - Make put API for updating

  return result;
};