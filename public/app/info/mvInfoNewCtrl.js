angular.module('app').controller('mvInfoNewCtrl', function($scope, $rootScope, $modalInstance, mvModelApi) {

  $scope.tabName = 'info';
  $scope.newInfo = {arguments:[{}], files:[{}]};

  $scope.showContent = function($fileContent, $fileName, file){
    console.log('file name : ' + $fileName);
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
      console.log("-- Saved execution");
      console.log("created data's id", execution._id);
      $scope.newInfo._id = execution._id;
      $scope.newInfo.status = execution.status;

      $modalInstance.close(execution);
    });
  };

  $scope.run = function() {
    console.log('-- Running execution');
    mvModelApi.runExecution($scope.newInfo, function(data) {
      $modalInstance.close(data);
    });
  };

  $scope.saveAndRun = function() {
    mvModelApi.createExecution($scope.newInfo, function(execution) {
      console.log("-- Saved execution");
      console.log("created data's id", execution._id);
      $scope.newInfo._id = execution._id;
      $scope.newInfo.status = execution.status;

      console.log('-- Running execution');
      mvModelApi.runExecution($scope.newInfo, function(data) {
        $modalInstance.close(data);
      });
    });
  };

  $scope.close = function() {
    $modalInstance.dismiss('Close');
  };
});