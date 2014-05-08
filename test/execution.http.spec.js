var app = require('./helper/app.js'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  exeCtrl = require('../server/controller/executeController');

describe('REST API for Execution - ', function() {
  var url = 'http://localhost:3030';

  it('should return a result of echo command', function (done) {
    var execution = { command: 'echo "HELLO WORLD!"', start:new Date()};

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
    var execution = { command: 'sleep 1', start:new Date()};

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

});