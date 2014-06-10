angular.module('app').factory('mvExecution', function ($resource) {

  var resource = $resource('/executions/:id', {id:'@id'}, {
    create: {method: 'POST', isArray: false},
    run: {method: 'PUT', params: {id:'@id'}, isArray: false}
  });

  return resource;
});