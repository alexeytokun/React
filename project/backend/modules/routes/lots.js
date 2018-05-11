var express = require('express');
var router = express.Router();
var lotsDB = require('../db/lots');
var usersDB = require('../db/users');
var errorsObj = require('../config/errors');

router.get('/', function (req, res, next) {
    lotsDB.getAllLots()
        .then(function (result) {
            req.body.lots = result;
            return lotsDB.getCategories();
        })
        .then(function (result) {
            req.body.categories = result;
            return usersDB.getUserNames();
        })
        .then(function (result) {
            return res.json({usernames: result, lots: req.body.lots, categories: req.body.categories});
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;