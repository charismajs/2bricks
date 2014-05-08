angular.module('app').controller('mvInfoCtrl', function ($scope, $modalInstance, mvExecution, execution) {

  $scope.execution = execution;

  $scope.start = function () {
    var data = mvExecution.create(
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