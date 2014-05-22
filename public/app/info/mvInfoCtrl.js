angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, mvModelApi, execution) {

    $scope.execution = execution;
    $scope.task = mvModelApi.Task.get({id:$scope.execution.taskId.toString()}, function() {
      $scope.job = mvModelApi.Job.get({id:$scope.task.jobId});
    });

    $scope.start = function () {
      var data = mvModelApi.Execution.create(
        {
          command: execution.command,
          start: new Date()
        });
      $modalInstance.close(data);
    };

    // TODO - Synchronous Logging from STDOUT at Server (execution.log)

    $scope.stop = function () {
      // TODO - Cancel a executing command
      var data = {};
      $modalInstance.close(data);
    };

    $scope.close = function () {
      $modalInstance.dismiss('cancel');
    };
  });