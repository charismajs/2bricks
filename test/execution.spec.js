var app = require('./helper/app.js'),
  mongoose = require('mongoose'),
  con = require('../server/config/constant'),
  exeCtrl = require('../server/controller/executionController');

describe('CRUD for Executions -', function () {

//  before(function(done) {
//    if (mongoose.connection.db) {
//      return done();
//    }
//    mongoose.connect(config.db, done);
//  });
//
//  after(function(done){
//    mongoose.connection.db.dropDatabase(function(){
//      mongoose.connection.close(done);
//    });
//  });

//  it('should return ls command', function (done) {
//    var expected = "ls -l";
//    var taskId = "53562e5ead5fe400004ba6e7";
//    exeCtrl.getCommand(taskId, function (result) {
//      result.should.equal(expected);
//      done();
//    });
//  });
//
//  it('should return replaced command', function (done) {
//    var expected = "ls -ale TestFolder"
//    var taskId = "53562d198d021f7cabb49f97";
//    exeCtrl.getCommand(taskId, function (result) {
//      result.should.equal(expected);
//      done();
//    });
//  });

  it('should return replaced command which is not related database', function (done) {
    var expected = 'ls -al /home';

    var job = {
      command: 'ls -al $folder',
      arguments: [
        {
          name: '$folder',
          description: 'Looking for the directory'
        }
      ]
    };

    var task = {
      arguments: [
        {
          name: "$folder",
          value: "/home"
        }
      ]
    };

    exeCtrl.replace(job, task).should.equal(expected);
    done();
  });

  it('should return stdout, after execute a command', function (done) {
    var expected = 'HELLO WORLD\n';
    var command = 'echo "HELLO WORLD"';

    exeCtrl.run(command, function (stdout) {
      stdout.should.equal(expected);
      done();
    });
  });

  it('should return a instance of Execution', function (done) {
    var Exe = mongoose.model(con.model.execution);

    Exe.create(
      {
        command: 'ls -al', taskId: 'ls', start: new Date()
      }, function (err, exe) {
        exe.status.should.equal('begin');
        exe.should.have.property('start');
        exe.should.not.have.property('log');
        exe.should.not.have.property('error');
        done();
      });

  });

  it('should return a successed execution', function (done) {
    var Exe = mongoose.model(con.model.execution);
    var execution = new Exe();

    execution.success('log').save(function (err, exe) {
      exe.status.should.equal(con.status.success);
      exe.log.should.equal('log');
      done();
    });
  });

  it('should return a failed execution', function (done) {
    var Exe = mongoose.model(con.model.execution);
    var execution = new Exe();

    execution.failed('', 'Permission Denied', function (exe) {
      exe.status.should.equal(con.status.failed);
      exe.log.should.equal('');
      exe.error.should.equal('Permission Denied');
      done();
    });
  });
});