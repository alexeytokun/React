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

module.exports = lotsDB;