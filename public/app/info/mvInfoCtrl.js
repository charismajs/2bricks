angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, $filter, mvModelApi, executions, execution) {
    $scope.tabName = 'info';

    $scope.content = '';
    $scope.name = '';
    $scope.execution = execution;

    var originalValue = angular.copy($scope.execution);


    $scope.showContent = function($fileContent, $fileName, file){
      file.name = $fileName;
      file.content = $fileContent;
    };

    $scope.run = function() {
      mvModelApi.runExecution($scope.execution, function(data) {
      });
    };

    $scope.saveAndRun = function() {
      mvModelApi.createExecution($scope.execution, function(newExecution) {

        console.log("Created execution - ", newExecution);


        executions.push(newExecution);
        $scope.execution = newExecution;

        $scope.execution.status = "begin";

        mvModelApi.runExecution(newExecution, function(data) {

          console.log("Runned execution - ", data);

          $scope.execution = data;

          // reset
          var i = $filter('getById')(executions, originalValue._id);
          executions[i] = originalValue;
        });
      });
    };

    $scope.stop = function () {
      mvModelApi.killExecution($scope.execution, function(newExecution) {
        $scope.execution = newExecution;
      });
    };

    $scope.close = function () {
      $modalInstance.dismiss('Close');
    };
  });