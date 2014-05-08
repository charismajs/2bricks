/**
 * Created by kp on 21/04/2014.
 */

module.exports = function (model) {
  var result = {
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

    get: function (id, next) {
      model.findOne({_id: id}).exec(function (err, data) {
        if (err)
          throw err;

        if (data)
          next(data);
      });
    }
  };

// TODO - Make put API for updating

  return result;
};