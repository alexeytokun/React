const io = require('../../server').io;
const lotsDB = require('../db/lots');


module.exports = socket => {
    console.log('New connection from ' + socket.handshake.address);

    socket.on('bid', data => {
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
            .then(() => lotsDB.getAuctionData(data.lot_id))
            .then((res) => {
                newData.buyer = res[0].bidder;
                io.emit('bid', newData).to(socket.room);
            })
            .catch(err => console.log(err));
    });

    socket.on('room', room => {
        if(socket.room) socket.leave(socket.room);
        socket.room = room;
        socket.join(room);
        console.log(socket.handshake.address + ' in room: ' + room);

        lotsDB.getAuctionData(room)
            .then(res => {
                if (!res.length) throw {status: 400, message: 'Bid Error'};
                const newData = {
                    bid: res[0].last_bid,
                    buyer: res[0].bidder
                };
                return newData;
            })
            .then((newData) => {
                io.sockets.in(socket.room).emit('bid', newData);
                console.log('ok');
            })
            .catch(err => console.log(err));
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
};