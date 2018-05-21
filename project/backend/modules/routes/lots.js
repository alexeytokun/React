const express = require('express');
const router = express.Router();
const lotsDB = require('../db/lots');
const errorsObj = require('../config/errors');

router.get('/', (req, res, next) => {
    lotsDB.getAllLots()
        .then(result => {
            if(!result.length) {
                throw {status: 400, message: 'No lots'};
            }
            req.body.lots = result;
            return lotsDB.getCategories();
        })
        .then(result => {
            req.body.categories = result;
            return lotsDB.getAllLotsImages();
        })
        .then(results => {
            for (let i = 0; i < req.body.lots.length; i++) {
                let filtered = results.filter(image => image.lot_id === req.body.lots[i].lot_id).map((img) => img.image);
                req.body.lots[i].images = filtered;
            }
            return res.json({ lots: req.body.lots, categories: req.body.categories});
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

module.exports = router;