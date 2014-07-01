angular.module('app').controller('mvInfoCtrl',
  function ($scope, $modalInstance, mvModelApi, execution, mySocket) {

    $scope.tabName = 'info';

    $scope.execution = angular.copy(execution);

    $scope.content = '';
    $scope.name = '';

    var isUpdate = false;

    mySocket.on('execution log', function(data) {
      // TODO - Find a proper execution, then attach log(data[_id])
//      console.log('received data in popup : ', data);
      if ($scope.execution._id == data._id) {
        $scope.execution.log += data.log;
      }
    });

    mySocket.on('execution info', function(execution) {
      if ($scope.execution._id == execution._id) {
//        $scope.execution = execution;
        $scope.execution.start = execution.start;
        $scope.execution.end = execution.end;
        $scope.execution.status = execution.status;
      }
    });

    $scope.showContent = function($fileContent, $fileName, file){
//      console.log('file name : ' + $fileName);
      file.name = $fileName;
      file.content = $fileContent;
    };

    $scope.run = function() {
      isUpdate = true;
      mvModelApi.runExecution($scope.execution, function(data) {
//        $scope.execution = data;
      });
    };

    $scope.saveAndRun = function() {
      isUpdate = true;
      mvModelApi.createExecution($scope.execution, function(execution) {
        $scope.execution = execution;
        mvModelApi.runExecution($scope.execution, function(data) {
//          $scope.execution = data;
        });
      });
    };

    $scope.stop = function () {
      // TODO - Cancel a executing command
      var data = {};
      $modalInstance.close(data);
    };

    $scope.close = function () {
      if (isUpdate) {
        $modalInstance.close($scope.execution);
      }
      else {
        $modalInstance.dismiss('Close');
      }
    };
  });