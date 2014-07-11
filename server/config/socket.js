var socket = '';

exports.init = function(server) {
  var io = require('socket.io')(server);

  io.sockets.on('connection', function(io) {
    socket = io;
  });

};

exports.sendLog = function(execution, data) {
  if (socket) {
    socket.emit('execution log',
      {
        _id: execution._id,
        log: data
      });
  }
};

exports.sendExecution = function(execution) {
  socket.emit('execution info', execution);
};
