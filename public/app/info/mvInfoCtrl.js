angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, mvModelApi, execution) {

    $scope.tabName = 'info';
    $scope.execution = angular.copy(execution);
    $scope.content = '';
    $scope.name = '';

    $scope.showContent = function($fileContent, $fileName, file){
//      console.log('file name : ' + $fileName);
      file.name = $fileName;
      file.content = $fileContent;
    };

    // TODO - Synchronous Logging from STDOUT at Server (execution.log)

    $scope.run = function() {
      mvModelApi.runExecution($scope.execution, function(data) {
        $modalInstance.close(data);
      });
    };

    $scope.saveAndRun = function() {
      mvModelApi.createExecution($scope.execution, function(execution) {
        $scope.execution = execution;
        mvModelApi.runExecution($scope.execution, function(data) {
          $modalInstance.close(data);
        });
      });
    };

    $scope.stop = function () {
      // TODO - Cancel a executing command
      var data = {};
      $modalInstance.close(data);
    };

    $scope.close = function () {
      $modalInstance.dismiss('Close');
    };
  });