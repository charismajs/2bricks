var app = require('./helper/app.js'),
  Execution = app.db.model(app.const.model.execution),
  Data = require('./data/data.js'),
  controller = require('../server/controller/executionController');

describe('execution.test.js - controller', function () {

  it('Replace command string by arguments', function () {

  });

  it('Test for a simple command', function (done) {
    var execution = new Execution(Data.executions);
    execution.command = 'echo "TEST"';
    controller.run(execution, function(execution) {
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
    controller.run(execution, function(execution) {
      execution.stdout.should.is.empty;
      execution.exit_code.should.not.equal(0); // the execution was failed
      done();
    });
  });

//  it('should return replaced command', function (done) {
//    var expected = "ls -ale TestFolder"
//    var taskId = "53562d198d021f7cabb49f97";
//    exeCtrl.getCommand(taskId, function (result) {
//      result.should.equal(expected);
//      done();
//    });
//  });

//  it('should return replaced command which is not related database', function (done) {
//    var expected = 'ls -al /home';
//
//    var job = {
//      command: 'ls -al $folder',
//      arguments: [
//        {
//          name: '$folder',
//          description: 'Looking for the directory'
//        }
//      ]
//    };
//
//    var task = {
//      arguments: [
//        {
//          name: "$folder",
//          value: "/home"
//        }
//      ]
//    };
//
//    exeCtrl.replace(job, task).should.equal(expected);
//    done();
//  });
//
//  it('should return stdout, after execute a command', function (done) {
//    var expected = 'HELLO WORLD\n';
//    var command = 'echo "HELLO WORLD"';
//
//    exeCtrl.run(command, function (stdout) {
//      stdout.should.equal(expected);
//      done();
//    });
//  });
//
//  it('should return a instance of Execution', function (done) {
//    var Exe = mongoose.model(con.model.execution);
//
//    Exe.create(
//      {
//        command: 'ls -al', taskId: 'ls', start: new Date()
//      }, function (err, exe) {
//        exe.status.should.equal('begin');
//        exe.should.have.property('start');
//        exe.should.not.have.property('log');
//        exe.should.not.have.property('error');
//        done();
//      });
//
//  });
//
//  it('should return a successed execution', function (done) {
//    var Exe = mongoose.model(con.model.execution);
//    var execution = new Exe();
//
//    execution.success('log').save(function (err, exe) {
//      exe.status.should.equal(con.status.success);
//      exe.log.should.equal('log');
//      done();
//    });
//  });
//
//  it('should return a failed execution', function (done) {
//    var Exe = mongoose.model(con.model.execution);
//    var execution = new Exe();
//
//    execution.failed('', 'Permission Denied', function (exe) {
//      exe.status.should.equal(con.status.failed);
//      exe.log.should.equal('');
//      exe.error.should.equal('Permission Denied');
//      done();
//    });
//  });
});