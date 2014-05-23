angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, mvModelApi, execution) {

    $scope.tabName = 'info';
    $scope.execution = execution;
    $scope.content = '';
    $scope.name = '';

    mvModelApi.Task.get({id:$scope.execution.taskId.toString()}, function(task) {
      $scope.task = task;
      mvModelApi.Job.get({id:$scope.task.jobId}, function(job) {
        $scope.job = job;
      });
    });

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

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
      $modalInstance.dismiss('close');
    };
  });