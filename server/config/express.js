/**
 * Created by kp on 21/04/2014.
 */
var express = require('express'),
    stylus = require('stylus');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    if ('development' == config.mode) {

        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
        app.use(express.static(config.rootPath + '/public'));
    }
};