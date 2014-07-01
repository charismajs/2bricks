angular.module('app').controller('mvMainCtrl', function ($scope, $resource, mvExecution, $modal, $log, mySocket) {

  // TODO - Support paging functions for executions
  $scope.executions = mvExecution.query();

  mySocket.on('execution log', function(data) {
    // TODO - Find a proper execution, then attach log(data[_id])
//    console.log('received data : ', data);

    for (var i = 0; i < $scope.executions.length; i++) {
      if ($scope.executions[i]._id == data._id) {
        $scope.executions[i].log += data.log;
        break;
      }
    }
  });

  mySocket.on('execution info', function(execution) {
    console.log('received data : ', execution);
    for (var i = 0; i < $scope.executions.length; i++) {
      if ($scope.executions[i]._id == execution._id) {
//        $scope.executions[i] = execution;
        $scope.executions[i].start = execution.start;
        $scope.executions[i].end = execution.end;
        $scope.executions[i].status = execution.status;
        break;
      }
    }
  });

//  mySocket.emit('new', 'Wow~!');

  // TODO - show a model page for detail information
  // There are only one button which is 'start' if it is finished
  // otherwise, it is 'stop'
  $scope.popupDetail = function (exe) {

    var modalInstance = $modal.open({
      templateUrl: '/partials/info/info',
      controller: 'mvInfoCtrl',
      resolve: {
        execution: function () {
          return exe;
        }
      }
    });

    modalInstance.result.then(function (execution) {
      // TODO - Find better solution
      var isNew = true;

      for (var i = 0; i < $scope.executions.length; i++) {
        if ($scope.executions[i]._id === execution._id) {
          $scope.executions[i] = execution;
          isNew = false;
          break;
        }
      }

      if (isNew) {
        $scope.executions.push(execution);
      }
    }, function (reason) {
      $log.info('-- Modal dismissed at: ' + new Date() + ' : ' + reason);
    });

  };

  $scope.popupNew = function() {
    var modalInstance = $modal.open({
      templateUrl: '/partials/info/new',
      controller: 'mvInfoNewCtrl'
    });

    modalInstance.result.then(function(execution) {
      $scope.executions.push(execution);
    }, function(reason) {
      $log.info('-- Modal dismissed at: ' + new Date() + ' : ' + reason);
    });
  };
});