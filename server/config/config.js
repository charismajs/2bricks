/**
 * Created by kp on 21/04/2014.
 */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var database = '2bricks';

module.exports = {
    development: {
        db: 'mongodb://localhost/' + database,
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        mode: 'development'
    },
    production: {
        db: 'mongodb://kp:12qwaszx@ds029640.mongolab.com:29640/' + database,
        rootPath: rootPath,
        port: process.env.PORT || 80,
        mode: 'production'
    }
}