var mongoose = require('mongoose');
var request = require('supertest');
var should = require('chai').should();
var Executor = require('../server/controller/ExecuteController');

describe('Command', function() {
    var url = 'http://localhost:3030';
    it ('should return ls command', function(done) {
        var expected = "ls -l";

        var taskId = "53562e5ead5fe400004ba6e7";
        Executor.getCommand(taskId, function(result) {
            result.should.equal(expected);
        });

        done();
    });

    it('should return replaced command', function(done) {
        var expected = ""
    })
});