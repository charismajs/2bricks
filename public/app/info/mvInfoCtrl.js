angular.module('app').controller('mvInfoCtrl', function ($scope, $modalInstance, mvExecution, execution) {

    $scope.execution = execution;

    $scope.command = execution.status === 'begin' ? 'STOP' : 'START';

    $scope.run = function () {
        // TODO : do start or stop according to the status of execution

        // if execution's status is stop then start
        mvExecution.create({command: execution.command});

        // TODO : Stop the execution
        // if execution's status is start then stop


        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});