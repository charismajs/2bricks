angular.module('app',
  [
    'ui.bootstrap',
    'ngResource',
    'ngRoute',
    'btford.socket-io'
  ]);

angular.module('app').config( function( $routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        });
});

angular.module('app').filter('getById', function() {
  return function(items, id) {
    for (var i=0; i<items.length; i++ ){
      if (items[i]._id == id)
      return i;
    }
    return null;
  };
});