angular.module('app').factory('mvExecution', function ($resource) {

  var resource = $resource('/executions', null, {
    create: {method: 'POST', isArray: false}
  });

  return resource;
});