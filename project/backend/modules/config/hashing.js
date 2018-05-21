const bcrypt = require('bcrypt');
const errorsObj = require('../config/errors');
const saltRounds = 10;

const hashingObj = {};

hashingObj.hash = data => {
    return bcrypt.hash(data, saltRounds)
        .catch(result => {
            throw ({ status: 406, message: errorsObj.VALIDATION });
        });
};

hashingObj.compare = (data, hash) => {
    return bcrypt.compare(data, hash)
        .catch(result => {
            throw ({ status: 406, message: errorsObj.VALIDATION });
        });
};

module.exports = hashingObj;