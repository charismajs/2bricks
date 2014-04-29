angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute']);

// TODO - routeProvider
angular.module('app').config( function( $routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        });
});
