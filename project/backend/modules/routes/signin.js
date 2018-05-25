const express = require('express');
const router = express.Router();
const dbObj = require('../db/users');
const errorsObj = require('../config/errors');
const hashingObj = require('../config/hashing');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwt_key');

const login = (user) => {
    return dbObj.getUserData(user.username)
        .then(results => {
            if (results.length) return results[0];
            throw ({ status: 401, message: errorsObj.AUTH });
        })
        .then(userData => {
            return hashingObj.compare(user.pass, userData.password)
                .then(result => {
                    if (result) return userData;
                    throw ({ status: 401, message: errorsObj.AUTH });
                });
        })
        .catch(result => {
            throw ({ status: result.status, message: result.message });
        });
};

router.post('/', (req, res, next) => {
    login(req.body)
        .then(userData => {
            delete userData.password;
            let token = jwt.sign({ role: userData.role, id: userData.id }, jwtKey, { expiresIn: '365d' });
            return { token: token, userdata: userData };
        })
        .catch(result => {
            throw ({ status: 401, message: errorsObj.AUTH });
        })
        .then(result => {
            return res.json({
                authtoken: result.token,
                userdata: result.userdata
            });
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

module.exports = router;
