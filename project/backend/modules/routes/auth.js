const express = require('express');
const router = express.Router();
const errorsObj = require('../config/errors');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwt_key');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

router.use((req, res, next) => {
    let body;
    let headerAuthToken;

    if (req.method !== 'OPTIONS') {
        body = req.body;
        headerAuthToken = String(req.headers['user-auth-token']);
        if (headerAuthToken === 'undefined') {
            body.token = 'guest';
            return next();
        }

        jwt.verify(headerAuthToken, jwtKey, (err, decoded) => {
            if (err) {
                body.token = 'guest';
            } else if (decoded) {
                body.token = decoded.role ? decoded.role : 'guest';
                body.userId = decoded.id;
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