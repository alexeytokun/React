var express = require('express');
var router = express.Router();
var lotsDB = require('../db/lots');

router.post('/', function (req, res, next) {
    console.log('ok');
});

router.get('/categories', function (req, res, next) {
    lotsDB.getCategories()
        .then(function (result) {
            return res.json(result);
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;