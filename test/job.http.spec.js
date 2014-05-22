var app = require('./helper/app.js'),
  con = require('../server/config/constant'),
  mongoose = require('mongoose'),
  request = require('supertest');

describe('REST API for Job -', function () {
  var url = 'http://localhost:3030';

  var job = {
    name: 'cat',
    command: 'command arg1 arg2',
    arguments: [],
    files: [],
    comments: 'by test case',
    createdDate: new Date()
  };

//  before(function (done) {
//    var Job = mongoose.model(con.model.job);
//    Job.remove({'comments': 'by test case'}, done);
//  });
//
//  it('should return new inserted job by POST - create', function (done) {
//    request(url)
//      .post('/jobs')
//      .send(job)
//      .expect(200)
//      .end(function (err, res) {
//        if (err) {
//          throw err;
//        }
//        res.body.name.should.equal(job.name);
//        res.body.command.should.equal(job.command);
//        res.body.should.have.property("_id");
//        done();
//      });
//  });

  it('should return error trying to save duplicate job by POST - re-insert', function (done) {
    request(url)
      .post('/jobs')
      .send(job)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(400);
        done();
      });
  });

  it('should return a changed job', function (done) {

    job.command = 'echo 123';

    request(url)
      .put('/jobs/' + job.name)
      .send(job)
      .end(function (err, res) {
        res.body.command.should.equal(job.command);
        done();
      })

  });

  it('should return a list of jobs', function (done) {
    request(url)
      .get('/jobs')
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        var list = res.body;
        list.should.not.null;
        list.length.should.gt(0);

        done();
      });
  });

  it('should return nothing if not exist', function (done) {
    var name = 'rtiuewrweo';
    request(url)
      .get('/jobs/' + name)
      .expect(404)
      .end(function (err, res) {
        res.body.message.should.equal(con.message.not_found);
        res.status.should.equal(404);
        done();
      })
  });

  it('should return "not found", when deleting job is not existed', function (done) {
    var name = 'wqeoruqiowr';
    request(url)
      .delete('/jobs/' + name)
      .expect(404)
      .end(function (err, res) {
        res.body.message.should.equal(con.message.not_found);
        res.status.should.equal(404);
        done();
      });
  });

//  it('should return a delete message, when deleted a job', function (done) {
//    request(url)
//      .delete('/jobs/' + job.name)
//      .expect(200)
//      .end(function (err, res) {
//        res.status.should.equal(200);
//        res.body.message.should.equal(con.message.delete + job.name);
//        done();
//      });
//  });
});