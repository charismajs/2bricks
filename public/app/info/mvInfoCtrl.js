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

    // TODO - Synchronous Logging from STDOUT at Server (execution.log)

    $scope.save = function() {
      var newExecution = $scope.execution;
      mvModelApi.createExecution(newExecution, function(execution) {
        console.log('-- Saved Execution');
        $scope.execution._id = execution._id;
        $scope.execution.status = execution.status;

        $modalInstance.close(execution);
      });
    };

    $scope.run = function() {
      console.log('-- Running Execution');
      console.log('Execution info : ', $scope.execution);

      mvModelApi.runExecution($scope.execution, function(data) {
        console.log('run execution info : ', $scope.execution);
        $modalInstance.close(data);
//        $modalInstance.close(null);
      });
    };

    $scope.saveAndRun = function() {
      var newExecution = $scope.execution;
      mvModelApi.createExecution(newExecution, function(execution) {
        $scope.execution._id = execution._id;
        $scope.execution.status = execution.status;

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