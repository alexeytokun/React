var errorsObj = require('../config/errors');
var pool = require('../config/connection').pool;
var SERVER_URL = require('../config/constants').SERVER_URL;

var query = function (sql, props) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({ status: 409, message: errorsObj.DB_CON });
                return;
            }
            connection.query(
                sql, props,
                function (error, result) {
                    if (error) reject({ status: 409, message: errorsObj.DB_QUERY });
                    else resolve(result);
                }
            );
            connection.release();
        });
    });
};

var lotsDB = {};

lotsDB.getCategories = function () {
    var sql = 'SELECT `category_id`, `category_name` FROM `categories`';
    var prop = '';
    return query(sql, prop);
};

lotsDB.getAllLots = function () {
    var sql = 'SELECT l.lot_id, l.lot_name, l.start_time, l.end_time, l.price AS starting_price, a.last_bid AS price,' +
        ' l.description, l.user_id, l.category_id, u.username FROM' +
        ' `lots` AS l LEFT JOIN `users` AS u ON l.user_id = u.id LEFT JOIN `auctions` AS a ON l.lot_id = a.lot_id';
    var prop = '';
    return query(sql, prop);
};

lotsDB.getAllLotsImages = function () {
    var sql = 'SELECT CONCAT("' + SERVER_URL + '", l.lot_image_path) AS image, l.lot_id FROM `lots_images` AS l';
    var prop = '';
    return query(sql, prop);
};

lotsDB.addLotToDb = function (lotData) {
    var sql = 'INSERT INTO `lots` (`lot_name`, `start_time`, `end_time`, `price`, `description`,' +
        ' `category_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var prop = [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description,
        lotData.category, lotData.userid];
    return query(sql, prop);
};

lotsDB.addLotImages = function (pathesArray, id) {
    let lot_img = [];
    for (let i = 0; i< pathesArray.length; i++) {
        lot_img.push([
            pathesArray[i],
            id
            ]);
    }
    var sql = 'INSERT INTO `lots_images` (`lot_image_path`, `lot_id`) VALUES ?';
    var prop = [lot_img];
    return query(sql, prop);
};

// CONCAT("' + SERVER_URL + '", l.image) AS image,

// lotsDB.updateLotData = function (lotData, imagePath, id) {
//
//     var prop = [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description,
//         lotData.category, lotData.userid, imagePath, id];
//     var imageQueryPart = ', `image`=?';
//
//     if (!imagePath) {
//         imageQueryPart = '';
//         prop =  [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description,
//             lotData.category, lotData.userid, id];
//     }
//     var sql = 'UPDATE `lots` SET `lot_name`=?, `start_time`=?, `end_time`=?, `price`=?, `description`=?, ' +
//         ' `category_id`=?, `user_id`=?' + imageQueryPart + ' WHERE `lot_id` = ?';
//
//     return query(sql, prop)
//         .then(function (result) {
//             if (result.affectedRows !== 0) {
//                 return ({ status: 200, message: 'Lot data updated' });
//             }
//             return ({ status: 400, message: errorsObj.WRONG_ID });
//         })
//         .catch(function (result) {
//             throw ({ status: result.status, message: result.message });
//         });
// };

lotsDB.getAuctionData = function (id) {
    var sql = 'SELECT a.last_bid, u.username AS bidder FROM `auctions` AS a LEFT JOIN `users` AS u ON a.bidder_id = u.id WHERE a.lot_id = ?';
    var prop = [id];
    return query(sql, prop);
};

lotsDB.updateAuctionData = function (data) {
    var sql = 'UPDATE `auctions` SET `last_bid`=?, `bidder_id`=? WHERE `lot_id` = ?';
    var prop = [data.bid, data.buyer, data.lot_id];
    return query(sql, prop);
};

module.exports = lotsDB;