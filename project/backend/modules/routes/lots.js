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
            req.body.categories = result;
            return lotsDB.getAllLotsImages();
        })
        .then(function (results) {
            let sortedImages = [];
            for (let i = 0; i < req.body.lots.length; i++) {
                let filtered = results.filter(image => image.lot_id === req.body.lots[i].lot_id).map((img) => img.image);
                req.body.lots[i].images = filtered;
            }
            console.log(req.body.lots);
        })
        .then(function (result) {
            return res.json({ lots: req.body.lots, categories: req.body.categories});
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

module.exports = router;