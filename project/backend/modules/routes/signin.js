var express = require('express');
var router = express.Router();
var dbObj = require('../db/users');
var errorsObj = require('../config/errors');
var hashingObj = require('../config/hashing');
var jwt = require('jsonwebtoken');
var jwtKey = require('../config/jwt_key');

function login(user) {
    return dbObj.getUserData(user.username)
        .then(function (results) {
            if (results.length) return results[0];
            throw ({ status: 406, message: errorsObj.AUTH });
        })
        .then(function (userData) {
            return hashingObj.compare(user.pass, userData.password)
                .then(function (result) {
                    if (result) return userData;
                    throw ({ status: 406, message: errorsObj.AUTH });
                });
        })
        .catch(function (result) {
            throw ({ status: result.status, message: result.message });
        });
};

router.post('/', function (req, res, next) {
    login(req.body)
        .then(function (userData) {
            delete userData.password;
            let token = jwt.sign({ role: userData.role }, jwtKey, { expiresIn: 60 * 60 });
            return { token: token, userdata: userData };
        })
        .catch(function (result) {
            throw ({ status: 406, message: errorsObj.AUTH });
        })
        .then(function (result) {
            return res.json({
                authtoken: result.token,
                userdata: result.userdata
            });
        })
        .catch(function (result) {
            res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;
