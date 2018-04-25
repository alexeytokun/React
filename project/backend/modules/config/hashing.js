var bcrypt = require('bcrypt');
var errorsObj = require('../config/errors');
const saltRounds = 10;

var hashingObj = {};

hashingObj.hash = function (data) {
    return bcrypt.hash(data, saltRounds)
        .catch(function (result) {
            throw ({ status: 406, message: errorsObj.VALIDATION });
        });
};

hashingObj.compare = function (data, hash) {
    return bcrypt.compare(data, hash)
        .catch(function (result) {
            throw ({ status: 406, message: errorsObj.VALIDATION });
        });
};

module.exports = hashingObj;