var express = require('express');
var router = express.Router();
var dbObj = require('../db/users');
var errorsObj = require('../config/errors');
var jwt = require('jsonwebtoken');
var jwtKey = require('../config/jwt_key');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

router.use(function (req, res, next) {
    var body;
    var headerAuthToken;

    if (req.method !== 'OPTIONS') {
        body = req.body;
        headerAuthToken = String(req.headers['user-auth-token']);
        if (headerAuthToken === 'undefined') {
            body.token = 'guest';
            return next();
        }

        jwt.verify(headerAuthToken, jwtKey, function(err, decoded) {
            if (err) {
                body.token = 'guest';
            } else if (decoded) {
                body.token = decoded.role ? decoded.role : 'guest';
            } else {
                body.token = 'guest';
            }
            return next();
        });

    } else {
        return next();
    }
});

module.exports = router;