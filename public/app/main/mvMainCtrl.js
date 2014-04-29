angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvExecution, $modal, $log){

    // TODO - Support paging functions for executions
    $scope.executions = mvExecution.query();

    // TODO - show a model page for detail information
    // There are only one button which is 'start' if it is finished
    // otherwise, it is 'stop'
    $scope.popupDetail = function(exe) {

        var modalInstance = $modal.open({
            templateUrl: '/partials/info/info',
            controller: 'mvInfoCtrl',
            resolve: {
                execution: function () {
                    return exe;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
});