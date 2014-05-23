angular.module('app').controller('mvInfoNewCtrl', function($scope, $modalInstance, mvModelApi) {

  $scope.tabName = 'info';
  $scope.newInfo = {};

  $scope.showContent = function($fileContent){
    $scope.content = $fileContent;
  };

  $scope.start = function() {
    //alert($scope.newInfo.commandName);
    var data = mvModelApi.Execution.create(
      {
        command: $scope.newInfo.commandName,
        start: new Date()
      });

    $modalInstance.close(data);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});