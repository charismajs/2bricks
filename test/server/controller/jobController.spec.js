var mongoose = require('mongoose');
var request = require('supertest');
var should = require('chai').should();

describe('Routing', function() {
    var url = 'http://localhost:3030';
    it('should return error trying to save duplicate job', function(done) {
        var job = {
            name:'ls', command:'ls -l', arguments:'', files:'', comments:'file list up', createDate:new Date()
        };

        request(url)
            .post('/jobs')
            .send(job)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(400);
                done();
            });
    });

    it('should return new inserted job', function(done) {
        var job = {
            name:'test', command:'test'
        }
        request(url)
            .delete('/jobs' + '/' + job.name)
            .expect(200)
            .end(function(err, res) {
                request(url)
                    .post('/jobs')
                    .send(job)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        res.body.name.should.equal(job.name);
                        res.body.command.should.equal(job.command);
                        res.body.should.have.property("_id");
                        done();
                    });
            });
    });
});