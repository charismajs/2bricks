var app = require('./helper/app.js'),
  request = require('supertest'),
  mongoose = require('mongoose');

describe('REST API for tasks - ', function () {
  var url = 'http://localhost:3030';
  var tempJobId = '';

  var job = {
    name: 'cat',
    command: 'command arg1 arg2',
    arguments: [],
    files: [],
    comments: 'by test case',
    createdDate: new Date()
  };

  before(function(done) {
    request(url)
      .get('/jobs/' + job.name)
      .end(function(err, res) {
        if (res.body._id != null && res.body._id != 'undefined') {
          tempJobId = res.body._id;
        }
        else {
          request(url)
            .post('/jobs')
            .send(job)
            .end(function (err, res) {
              if (err) {
                throw err;
              }
            });
        }

        done();
      });
  });

  it('should return a inserted task by GET, after save by POST ', function (done) {

    var newTask = {
      jobId: tempJobId,
      arguments: [
        {name: '$param1', value: 'argument1'},
        {name: '$param2', value: 'argument2'}
      ],
      createdDate: new Date(),
      creator: 'Admin'};

    request(url)
      .post('/tasks')
      .send(newTask)
      .expect(200)
      .end(function (err, res) {
        var task = res.body;

        task.jobId.should.equal(newTask.jobId.toString());
        new Date(task.createdDate).should.equalDate(newTask.createdDate);

        request(url)
          .get('/tasks' + '/' + task._id)
          .expect(200)
          .end(function (err, res) {
            var ret_task = res.body;

            ret_task.jobId.should.equal(task.jobId.toString());
            new Date(ret_task.createdDate).should.equalDate(new Date(task.createdDate));
            ret_task._id.should.equal(task._id.toString());

            done();
          });
      });

  });

  it('should return a list of tasks', function (done) {

    request(url)
      .get('/tasks')
      .expect(200)
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
});