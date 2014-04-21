/**
 * Created by kp on 21/04/2014.
 */


module.exports = function(app) {

    app.get('/', function (req, res) {
        res.render('index');
    });
};