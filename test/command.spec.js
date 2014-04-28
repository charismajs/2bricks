var mongoose = require('mongoose');
var request = require('supertest');
var should = require('chai').should();
var executor = require('../server/controller/executeController');

describe('Command', function() {
    var url = 'http://localhost:3030';
    it ('should return ls command', function(done) {
        var expected = "ls -l";

        var taskId = "53562e5ead5fe400004ba6e7";
        executor.getCommand(taskId, function(result) {
            result.should.equal(expected);
        });

        done();
    });

    it('should return replaced command', function(done) {
        var expected = "ls -ale TestFolder"

        var taskId = "53562d198d021f7cabb49f97";
        executor.getCommand(taskId, function(result) {
            result.should.equal(expected);
        });

        done();
    });

    it('should return replaced command which is not related database', function(done) {
        var expected = 'ls -al /home';

        var job = {
            command: 'ls -al $folder',
            arguments: [
                {
                    name: '$folder',
                    description: 'Looking for the directory'
                }
            ]
        }

        var task = {
            arguments: [
                {
                    name: "$folder",
                    value: "/home"
                }
            ]
        }

        executor.replace(job, task).should.equal(expected);
        done();
    });

    it('should return stdout, after execute a command', function(done) {
        var expected = 'HELLO WORLD\n';
        var command = 'echo "HELLO WORLD"';

        executor.run(command, function(stdout) {
            stdout.should.equal(expected);
        });

        done();
    });


});