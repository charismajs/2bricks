angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, mvModelApi, execution) {

    $scope.tabName = 'info';
    $scope.execution = execution;
    $scope.content = '';
    $scope.name = '';

    $scope.showContent = function($fileContent, $fileName, file){
      console.log('file name : ' + $fileName);
      file.name = $fileName;
      file.content = $fileContent;
    };

    $scope.start = function () {
      var data = mvModelApi.createExecution(execution);
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