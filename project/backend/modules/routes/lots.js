var express = require('express');
var router = express.Router();
var lotsDB = require('../db/lots');
var errorsObj = require('../config/errors');

router.get('/', function (req, res, next) {
    lotsDB.getAllLots()
        .then(function (result) {
            req.body.lots = result;
            return lotsDB.getCategories();
        })
        .then(function (result) {
            console.log({categories: result, lots: req.body.lots});
            return res.json({categories: result, lots: req.body.lots});
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;