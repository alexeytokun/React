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
    var sql = 'SELECT l.lot_id, l.lot_name, l.start_time, l.end_time, l.price, CONCAT("' + SERVER_URL + '", l.image)  AS image,' +
        ' l.description, l.user_id, l.category_id, u.username FROM `lots` AS l LEFT JOIN `users` AS u ON l.user_id = u.id';
    var prop = '';
    return query(sql, prop);
};

lotsDB.addLotToDb = function (lotData, imagePath) {
    var sql = 'INSERT INTO `lots` (`lot_name`, `start_time`, `end_time`, `price`, `description`, `image`,' +
        ' `category_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    var prop = [lotData.lotname, lotData.start, lotData.end, lotData.price, lotData.description, imagePath,
        lotData.category, lotData.userid];
    return query(sql, prop);
};

lotsDB.getBidData = function (id) {
    var sql = 'SELECT `price`, `bidder_id` FROM `lots` WHERE `lot_id` = ?';
    var prop = [id];
    return query(sql, prop);
};

module.exports = lotsDB;