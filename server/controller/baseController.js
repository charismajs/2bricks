/**
 * Created by kp on 21/04/2014.
 */

module.exports = function(model) {
    return {
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

        get : function (req, res, next) {
            var id = req.params.name;
            model.findOne({name: id}).exec(function (err, data) {

                if (data == null) {
                    res.status(404).json({status: 'Not found - ' + id});
                }

                res.json(data);
            });
        }
    }
}
