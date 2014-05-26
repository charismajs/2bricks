angular.module('app').controller('mvInfoNewCtrl', function($scope, $modalInstance, mvModelApi) {

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

  $scope.start = function() {
    var data = mvModelApi.createExecution($scope.newInfo);
    console.log('Added new info : ' + $scope.newInfo);
    $modalInstance.close(data);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});