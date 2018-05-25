const errorsObj = require('../config/errors');
const pool = require('../config/connection').pool;
const SERVER_URL = require('../config/constants').SERVER_URL;

const query = (sql, props) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject({ status: 409, message: errorsObj.DB_CON });
                return;
            }
            connection.query(
                sql, props,
                (error, result) => {
                    if (error) reject({ status: 409, message: errorsObj.DB_QUERY });
                    else resolve(result);
                }
            );
            connection.release();
        });
    });
};

const dbObj = {};

dbObj.addUserToDb = (username, firstname, lastname, email, pass) => {
    const sql = 'INSERT INTO `users` (`username`, `firstname`, `lastname`, `email`, `password`)' +
        ' VALUES (?, ?, ?, ?, ?)';
    const userData = [username, firstname, lastname, email, pass];
    return query(sql, userData);
};

dbObj.getUserData = username => {
    const sql = 'SELECT `id`, `username`, `firstname`, `lastname`, `email`, `role`, CONCAT("' + SERVER_URL + '", `avatar`)' +
        ' AS avatar, `password`' + ' FROM `users` WHERE `username` = ?';
    const prop = [username];
    return query(sql, prop);
};

dbObj.setAvatar = (path, id) => {
    const sql = 'UPDATE `users` SET `avatar`=? WHERE id=?';
    const prop = [path, id];
    return query(sql, prop);
};

dbObj.getAvatar = id => {
    const sql = 'SELECT CONCAT("' + SERVER_URL + '", `avatar`) AS avatar FROM `users` WHERE id=?';
    const prop = [id];
    return query(sql, prop);
};

dbObj.checkUsername = name => {
    const sql = 'SELECT `id` FROM `users` WHERE `username` = ? COLLATE utf8_unicode_ci';
    const prop = [name];
    return query(sql, prop);
};

dbObj.getUserById = id => {
    const sql = 'SELECT `id`, `username`, `firstname`, `lastname`, `email`, `role`, CONCAT("' + SERVER_URL + '", `avatar`)' +
        ' AS avatar FROM `users` WHERE `id` = ?';
    const prop = id;

    return query(sql, prop);
};

dbObj.getUserRole = id => {
    const sql = 'SELECT ' + '`id`, `role`' + ' FROM `users` WHERE `id` = ?';
    const prop = id;

    return query(sql, prop);
};

dbObj.updateUserData = (id, data) => {
    let sql = 'UPDATE `users` SET `username`=?, `firstname`=?, `lastname`=?, `email`=?,`password`=? WHERE id=?';
    let prop = [data.username, data.firstname, data.lastname, data.email, data.pass, id];
    if (data.pass === '') {
        sql = 'UPDATE `users` SET `username`=?, `firstname`=?, `lastname`=?, `email`=? WHERE id=?';
        prop = [data.username, data.firstname, data.lastname, data.email, id];
    }
    return query(sql, prop)
        .then(result => {
            if (result.affectedRows !== 0) {
                return ({ status: 200, message: 'User data updated' });
            }
            return ({ status: 406, message: errorsObj.WRONG_ID });
        })
        .catch(result => {
            throw ({ status: result.status, message: result.message });
        });
};

dbObj.isUnique = function (username, id) {
    return dbObj.checkUsername(username)
        .then(results => {
            if (!results.length || (+results[0].id === +id)) return;
            throw ({ status: 406, message: errorsObj.USERNAME });
        })
        .catch(result => {
            throw ({ status: result.status, message: result.message });
        });
};

module.exports = dbObj;
