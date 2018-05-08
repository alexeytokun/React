var io = require('../../server').io;
let temp = false;

module.exports = function (socket) {
    console.log('New connection from ' + socket.handshake.address);

    socket.emit('news', temp || 'Good News');

    socket.on('send', function (data) {
        io.emit('news', data);
        temp = data;
        console.log(data);
    });
};