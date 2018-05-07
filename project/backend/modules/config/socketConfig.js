var io = require('../../server').io;

module.exports = function (socket) {
    console.log("Connected succesfully to the socket ...");

    socket.emit('news', 'Good News');

    socket.on('send', function (data) {
        io.emit('news', data);
        console.log(data);
    });
};