angular.module('app').factory('mvTask', function($resource) {

  var resource = $resource('/tasks/:id', null);

  return resource;
});