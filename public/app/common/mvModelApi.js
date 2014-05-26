angular.module('app').service('mvModelApi', function(mvJob, mvTask, mvExecution) {
  return {
    Job : mvJob,
    Task : mvTask,
    Execution : mvExecution,


    createExecution : function(execution) {

      var args = execution.arguments;

      var newargs = [];
      for (var i = 0 ; i<args.length; i++) {
        newargs.push({
          name : args[i].name,
          value : args[i].value,
          description : args[i].description
        })
      }

      console.log('files info at ModelAPI : ' + execution.files);

      var data = mvExecution.create(
        {
          command: execution.command,
          name : execution.name,
          comment : execution.comment,
          arguments : newargs,
          files : execution.files,
          start: new Date()
        });


      return data;
    }
  };
});