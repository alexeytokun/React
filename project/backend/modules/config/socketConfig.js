const io = require('../../server').io;
const lotsDB = require('../db/lots');


module.exports = function (socket) {
    console.log('New connection from ' + socket.handshake.address);

    socket.on('bid', function (data) {
        let newData;
        lotsDB.getAuctionData(data.lot_id)
            .then(res => {
                if (!res.length || res[0].last_bid >= data.bid) throw {status: 400, message: 'Bid Error'};
                newData = {
                    bid: data.bid,
                    buyer: data.buyer,
                    lot_id: data.lot_id
                };
                return newData;
            })
            .then(newData => lotsDB.updateAuctionData(newData))
            .then(() => io.emit('bid', newData).to(socket.room))
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