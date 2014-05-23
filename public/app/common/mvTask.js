angular.module('app').factory('mvTask', function($resource) {

  var resource = $resource('/tasks/:id', {id: '@id'});

  return resource;
});