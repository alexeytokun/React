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

var dbObj = {};

dbObj.addUserToDb = function (username, firstname, lastname, email, pass) {
    var sql = 'INSERT INTO `users` (`username`, `firstname`, `lastname`, `email`, `password`)' +
        ' VALUES (?, ?, ?, ?, ?)';
    var userData = [username, firstname, lastname, email, pass];
    return query(sql, userData);
};

dbObj.getUserData = function (username) {
    var sql = 'SELECT `id`, `username`, `firstname`, `lastname`, `email`, `role`, CONCAT("' + SERVER_URL + '", `avatar`)' +
        ' AS avatar, `password`' + ' FROM `users` WHERE `username` = ?';
    var prop = [username];
    return query(sql, prop);
};

dbObj.setAvatar = function (path, id) {
    var sql = 'UPDATE `users` SET `avatar`=? WHERE id=?';
    var prop = [path, id];
    return query(sql, prop);
};

dbObj.getAvatar = function (id) {
    var sql = 'SELECT CONCAT("' + SERVER_URL + '", `avatar`) AS avatar FROM `users` WHERE id=?';
    var prop = [id];
    return query(sql, prop);
};

dbObj.checkUsername = function (name) {
    var sql = 'SELECT `id` FROM `users` WHERE `username` = ? COLLATE utf8_unicode_ci';
    var prop = [name];
    return query(sql, prop);
};

dbObj.getUserById = function (id) {
    var sql = 'SELECT `id`, `username`, `firstname`, `lastname`, `email`, `role`, CONCAT("' + SERVER_URL + '", `avatar`)' +
        ' AS avatar FROM `users` WHERE `id` = ?';
    var prop = id;

    return query(sql, prop);
};

dbObj.getUserRole = function (id) {
    var sql = 'SELECT ' + '`id`, `role`' + ' FROM `users` WHERE `id` = ?';
    var prop = id;

    return query(sql, prop);
};

dbObj.updateUserData = function (id, data) {
    var sql = 'UPDATE `users` SET `username`=?, `firstname`=?, `lastname`=?, `email`=?,`password`=? WHERE id=?';
    var prop = [data.username, data.firstname, data.lastname, data.email, data.pass, id];
    if (data.pass === '') {
        sql = 'UPDATE `users` SET `username`=?, `firstname`=?, `lastname`=?, `email`=? WHERE id=?';
        prop = [data.username, data.firstname, data.lastname, data.email, id];
    }
    return query(sql, prop)
        .then(function (result) {
            if (result.affectedRows !== 0) {
                return ({ status: 200, message: 'User data updated' });
            }
            return ({ status: 400, message: errorsObj.WRONG_ID });
        })
        .catch(function (result) {
            throw ({ status: result.status, message: result.message });
        });
};

dbObj.isUnique = function (username, id) {
    return dbObj.checkUsername(username)
        .then(function (results) {
            if (!results.length || (+results[0].id === +id)) return;
            throw ({ status: 406, message: errorsObj.USERNAME });
        })
        .catch(function (result) {
            throw ({ status: result.status, message: result.message });
        });
};

module.exports = dbObj;
