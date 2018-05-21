const mysql = require('mysql');

const connectionObj = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'project',
    connectionLimit: 100,
    port: 8000
};

const pool = mysql.createPool({
    host: connectionObj.host,
    user: connectionObj.user,
    password: connectionObj.password,
    database: connectionObj.database,
    connectionLimit: connectionObj.connectionLimit
});

module.exports.connectionObj = connectionObj;
module.exports.pool = pool;
