var app = require('./helper/app.js'),
  con = require('..')
  mongoose = require('mongoose'),
  request = require('supertest');

describe('JobController', function () {
  var url = 'http://localhost:3030';

  after(function(done) {
    var Job = mongoose.model(con.model.job);
    Job.remove({'comments':'by test case'}, done);

  });

  it('should return error trying to save duplicate job by POST', function (done) {
    var job = {
      name: 'ls', command: 'ls -l', arguments: '', files: '', comments: 'file list up', createDate: new Date()
    };

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

  it('should return new inserted job by POST', function (done) {
    var job = {
      name: 'test', command: 'test'
    };

    request(url)
      .delete('/jobs' + '/' + job.name)
      .expect(200)
      .end(function (err, res) {
        request(url)
          .post('/jobs')
          .send(job)
          .expect(200)
          .end(function (err, res) {
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

  // TODO - UPDATE
  it('should return a changed job', function(done) {
    var job = {
      name : 'test for updating job',
      command : 'command arg1 arg2',
      arguments : [],
      files : [],
      comments : 'by test case',
      createdDate : new Date()
    }

    request(url)
      .post('/jobs')
      .send(job)
      .end(function (err, res) {
        res.body.should.have.property('_id');
        res.body.name.should.equal(job.name);
        res.body.command.should.equal(job.command);
        new Date(res.body.createdDate).should.equalDate(new Date(job.createdDate));
        done();
      })

  });


  // TODO - CREATE

  // TODO - LIST

  // TODO - DELETE

});