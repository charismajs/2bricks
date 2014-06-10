angular.module('app').service('mvModelApi', function(mvJob, mvTask, mvExecution) {
  return {
    Job : mvJob,
    Task : mvTask,
    Execution : mvExecution,


    createExecution : function(execution, next) {

      var args = execution.arguments;

      var newArgs = [];
      for (var i = 0 ; i < args.length; i++) {
        newArgs.push({
          name : args[i].name,
          value : args[i].value,
          description : args[i].description
        })
      }

//      console.log('files info at create in ModelAPI : ', execution.files);

      mvExecution.create(
        {
          command: execution.command,
          name : execution.name,
          comment : execution.comment,
          arguments : newArgs,
          files : execution.files,
          start: new Date()
        }, function(exe) {

          next(exe);
        });
    },

    runExecution : function(execution) {
      var data = mvExecution.run(
        {
          id: execution.id,
          command: execution.command,
          name : execution.name,
          comment : execution.comment,
          arguments : execution.arguments,
          files : execution.files,
          start: new Date()
        });

      return data;
    }
  };
});