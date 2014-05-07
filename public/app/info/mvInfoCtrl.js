angular.module('app').controller('mvInfoCtrl', function ($scope, $modalInstance, mvExecution, execution) {

  $scope.execution = execution;

  $scope.command = execution.status === 'start' ? 'stop' : 'start';

  $scope.run = function () {
    var data = mvExecution.create(
      {
        command: execution.command,
        start: new Date()
      });
    $modalInstance.close(data);
  };

  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
});