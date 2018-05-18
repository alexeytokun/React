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
                    buyer: data.buyer
                };
                return newData;
            })
            .then(newData => lotsDB.updateAuctionData(newData))
            .then(() => lotsDB.getAuctionData(data.lot_id))
            .then((res) => {
                newData.buyer = res[0].bidder;
                io.emit('bid', newData).to(socket.room);
            })
            .catch(err => console.log(err));
    });

    socket.on('room', function (room) {
        if(socket.room) socket.leave(socket.room);
        socket.room = room;
        socket.join(room);
        console.log(socket.handshake.address + ' in room: ' + room);

        lotsDB.getAuctionData(room)
            .then(res => {
                if (!res.length) throw {status: 400, message: 'Bid Error'};
                console.log(res[0]);
                const newData = {
                    bid: res[0].last_bid,
                    buyer: res[0].bidder
                };
                return newData;
            })
            .then((newData) => io.emit('bid', newData).to(socket.room))
            .catch(err => console.log(err));
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });
};