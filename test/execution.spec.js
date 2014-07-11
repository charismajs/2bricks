var app = require('./helper/app.js'),
  Execution = app.db.model(app.const.model.execution),
  Data = require('./data/data.js'),
  controller = require('../server/controller/executionController');

describe('Controller for Execution', function () {

  describe('Replace commands by arguments', function () {
    it('Replace command string by arguments', function () {
      var command = "echo $1";
      var argument = [
        {"name": "$1", "value": "Hello"}
      ];
      var result = controller.replace(command, argument);
      result.should.equal("echo Hello");
    });

    it('Replace command by exact name using whitespace characters', function () {
      var command = "echo $11 $1";
      var argument = [
        {"name": "$1", "value": "World"},
        {"name": "$11", "value": "Hello"}
      ];
      var result = controller.replace(command, argument);
      result.should.equal("echo Hello World");
    });
  });

  describe('Run simple commands', function () {
    it('Test for a simple command', function (done) {
      var execution = new Execution(Data.executions);
      execution.command = 'echo "TEST"';
      controller.run(execution, function (execution) {
        execution.stdout.should.equal("TEST\n");
        execution.stderr.should.is.empty;
        execution.exit_code.should.equal(0);
        execution.status.should.equal(app.const.status.success);
        done();
      });
    });

    it('Test a result when failed using a wrong command ', function (done) {
      var execution = new Execution(Data.exeuctions);
      execution.command = 'ABCDEFGHIJK';
      controller.run(execution, function (execution) {
        execution.stdout.should.is.empty;
        execution.exit_code.should.not.equal(0); // the execution was failed
        done();
      });
    });
  });

  describe('Kill commands', function () {
    it('Kill a sleep commands', function (done) {
      var execution = new Execution(Data.executions);
      execution.command = 'sleep 10';

      controller.run(execution, function() { });
      execution.status.should.equal(app.const.status.init);
      controller.kill(execution);
      execution.status.should.equal(app.const.status.killed);

      done();
    });
  });
});