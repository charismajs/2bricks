angular.module('app').factory('mySocket', function (socketFactory) {
    var mySocket = socketFactory();
    mySocket.forward('error');
    return mySocket;
  });