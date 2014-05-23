angular.module('app').factory('mvJob', function($resource) {

  var resource = $resource('/jobs/id/:id', {id: '@id'});

  return resource;
});