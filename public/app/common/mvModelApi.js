angular.module('app').service('mvModelApi', function(mvJob, mvTask, mvExecution) {

  var create = function(execution, next) {
    console.log('-- Creating Execution', execution);
    var args = execution.arguments;
    var newArgs = [];

    for (var i = 0 ; i < args.length; i++) {
      newArgs.push({
        name : args[i].name,
        value : args[i].value,
        description : args[i].description
      })
    }

    mvExecution.create(
      {
        command: execution.command,
        name : execution.name,
        comment : execution.comment,
        arguments : newArgs,
        files : execution.files,
        start: new Date()
      }, function(exe) {
        console.log('-- Created execution', exe);
//        console.log("created execution's id", exe._id);
        next(exe);
      });
  };

  var run = function(execution, next) {
    console.log('-- Running execution', execution);
    mvExecution.run(
      {
        id: execution._id,
        command: execution.command,
        name : execution.name,
        comment : execution.comment,
        arguments : execution.arguments,
        files : execution.files,
        start: new Date()
      }, function(exe) {
        console.log('-- Run execution', exe);
        next(exe);
      });
  };

  return {
    createExecution : create,
    runExecution : run
  };
});