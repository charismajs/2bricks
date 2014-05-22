angular.module('app').service('mvModelApi', function(mvJob, mvTask, mvExecution) {
  return {
    Job : mvJob,
    Task : mvTask,
    Execution : mvExecution
  };
});