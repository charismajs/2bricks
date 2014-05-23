angular.module('app').controller('mvInfoNewCtrl', function($scope, $modalInstance, mvModelApi) {

  $scope.tabName = 'info';

  $scope.showContent = function($fileContent){
    $scope.content = $fileContent;
  };

  $scope.start = function(newInfo) {
    console.log(newInfo.commandName);
    console.log(this);
    var data = mvModelApi.Execution.create(
      {
        command: $scope.commandName,
        start: new Date()
      });

    $modalInstance.close(data);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});