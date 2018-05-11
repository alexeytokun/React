var errorsObj = require('../config/errors');
var pool = require('../config/connection').pool;

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
    var sql = 'SELECT * FROM `lots`';
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

module.exports = lotsDB;