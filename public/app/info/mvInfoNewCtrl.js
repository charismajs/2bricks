angular.module('app').controller('mvInfoNewCtrl', function($scope, $rootScope, $modalInstance, mvModelApi) {

  $scope.tabName = 'info';
  $scope.newInfo = {arguments:[{}], files:[{}]};

  $scope.showContent = function($fileContent, $fileName, file){
//    console.log('file name : ' + $fileName);
    file.name = $fileName;
    file.content = $fileContent;
  };

  $scope.addArgument = function() {
    $scope.newInfo.arguments.push([]);
  };

  $scope.removeArgument = function(index) {
    $scope.newInfo.arguments.splice(index, 1);
  };

  $scope.save = function() {
    mvModelApi.createExecution($scope.newInfo, function(execution) {
      $scope.newInfo = execution;
      $modalInstance.close(execution);
    });
  };

  $scope.saveAndRun = function() {
    mvModelApi.createExecution($scope.newInfo, function(execution) {
      $scope.newInfo = execution;

      mvModelApi.runExecution($scope.newInfo, function(data) {
        $modalInstance.close(data);
      });
    });
  };

  $scope.close = function() {
    $modalInstance.dismiss('Close');
  };
});