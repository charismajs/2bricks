/**
 * Created by kp on 21/04/2014.
 */

module.exports = function(model) {
    var getFn = function (id, next) {
        model.findOne({_id: id}).exec(function (err, data) {
            next(data);
        });
    };

    var result = {
        create: function (req, res, next) {
            var data = req.body;

            model.create(data, function (err, result) {
                if (err) {
                    res.send(err);
                }

                res.send(result);
            })
        },

        getList : function (req, res, next) {
            model.find(function (err, list) {
                if (err)
                    res.send(err);

                res.json(list);
            })
        },

        get : getFn,

        getOverHttp : function (req, res, next) {
            var id = req.params.name;
            getFn(id, function(data) {
                if (data == null) {
                    res.status(404).json({status: 'Not found - ' + id});
                }
                res.json(data);
            });
        }
    };

    // TODO - Make put API for updating

    return result;
};