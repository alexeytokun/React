var express = require('express');
var router = express.Router();
var lotsDB = require('../db/lots');
var usersDB = require('../db/users');
var errorsObj = require('../config/errors');

router.get('/', function (req, res, next) {
    lotsDB.getAllLots()
        .then(function (result) {
            if(!result.length) {
                throw {status: 400, message: 'No lots'};
            }

            req.body.lots = result;
            return lotsDB.getCategories();
        })
        .then(function (result) {
            return res.json({ lots: req.body.lots, categories: result});
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;