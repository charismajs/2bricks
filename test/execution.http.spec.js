var app = require('./helper/app.js'),
  con = require('../server/config/constant'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  exeCtrl = require('../server/controller/executionController');

describe('REST API for Execution - ', function() {
  var url = 'http://localhost:3030';
  var tempTaskId = '';

  before(function(done) {
    // There is a problem if task is not exist..
    request(url)
      .get('/tasks')
      .end(function (err, res) {
        var tasks = res.body
        tempTaskId = tasks[0]._id;

        done();
      });
  });

  it('should return a result of echo command', function (done) {

    var execution = { command: 'echo "HELLO WORLD!"', start:new Date(), taskId: tempTaskId };

    request(url)
      .post('/executions')
      .send(execution)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);

        var r = res.body;

        r.command.should.equal(execution.command);
        r.status.should.equal('finish');
        r.should.have.property('end');
        r.log.should.equal('HELLO WORLD!\n');

        done();
      });

  });

  it('should return a result of sleep command', function (done) {
    var execution = { command: 'sleep 1', start:new Date(), taskId: tempTaskId };

    request(url)
      .post('/executions')
      .send(execution)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        var r = res.body;

        r.command.should.equal(execution.command);
        r.status.should.equal('finish');
        r.should.have.property('end');
        r.log.should.equal('');

        done();
      });
  });

  it('should return a list of executions', function (done) {

    request(url)
      .get('/executions')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }

        var executions = res.body;

        executions.should.not.null;
        executions.length.should.gt(0);

        done();
      });
  });


  it('should return a inserted execution', function(done) {
    var Execution = mongoose.model(con.model.execution);

    Execution.create(
      {
        command: 'ls -al',
        taskId: tempTaskId,
        start: new Date()
      },
      function (err, exe) {
        request(url)
          .get('/executions' + '/' + exe._id)
          .expect(200)
          .end(function(err, res) {
            var ret_exe = res.body;

            ret_exe.command.should.equal(exe.command);
            ret_exe.status.should.equal(exe.status);
            ret_exe._id.should.equal(exe._id.toString());

            done();
          });
      });

  });
});