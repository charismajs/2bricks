angular.module('app').controller('mvInfoCtrl', function ($scope, $modalInstance, mvExecution, execution) {

    $scope.execution = execution;

    $scope.command = execution.status === 'start' ? 'stop' : 'start';

    $scope.run = function () {
        mvExecution.create({command: execution.command});

        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});