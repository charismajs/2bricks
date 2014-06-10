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

  $scope.save = function() {
    var data = mvModelApi.createExecution($scope.newInfo, function(execution) {
      console.log("created data's id", execution._id);
      $scope.newInfo.id = execution._id;
    });
  };

  $scope.run = function() {
    var data = mvModelApi.runExecution($scope.newInfo);
    console.log('Save and run new info : ', $scope.newInfo);
    $modalInstance.close(data);
  };

  $scope.close = function() {
    $modalInstance.dismiss('close');
  };
});