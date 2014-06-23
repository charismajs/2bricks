var exeCtrl = require('../controller/executionController');

module.exports = function(server) {
  var io = require('socket.io')(server);
  io.sockets.on('connection', exeCtrl.respond);
};
