const io = require('../../server').io;
const lotsDB = require('../db/lots');


module.exports = function (socket) {
    console.log('New connection from ' + socket.handshake.address);

    socket.on('bid', function (data) {
        console.log(data);
        lotsDB.getBidData(data.lot_id)
            .then(res => {
                console.log(res);
                if (!res.length) return;
                if (res[0].price < data.bid) {
                    const newData = {
                        bid: data.bid,
                        buyer: data.buyer,
                        lot_id: data.lot_id
                    };
                    io.emit('bid', newData);
                }
            })
            .catch(err => console.log(err));
    });

    socket.on('room', function (room) {
        if(socket.room) socket.leave(socket.room);
        socket.room = room;
        socket.join(room);
        console.log(socket.handshake.address + ' in room: ' + room);
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });
};