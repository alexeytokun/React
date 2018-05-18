var express = require('express');
var router = express.Router();
var lotsDB = require('../db/lots');
var errorsObj = require('../config/errors');
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var fileType = require('file-type');

var storage = multer.diskStorage({
    destination: './public/lot_images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

router.post('/', function (req, res, next) {
        if (req.body.token !== 'admin' && req.body.token !== 'user') {
            return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
        }
        return next();
    }, upload.any(), function (req, res, next) {
        req.body.lotdata = JSON.parse(req.body.lotdata);
        // validation here
        return next();
    }, function (req, res, next) {
        lotsDB.addLotToDb(req.body.lotdata)
            .then(function (result) {
                let insertId = result.insertId;
                const pathesArray = [];
                for (let i=0; i < req.files.length; i++) {
                    pathesArray.push(req.files[i].path);
                }
                lotsDB.addLotImages(pathesArray, insertId)
                    .then(function () {
                        return res.json({ message: 'ok' });
                    })
                    .catch(function (result) {
                        return res.status(result.status).json({ message: result.message });
                    });
            })
            .catch(function (result) {
                return res.status(result.status).json({ message: result.message });
            });
});

router.post('/:id', function (req, res, next) {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, upload.any(), function (req, res, next) {
    req.body.lotdata = JSON.parse(req.body.lotdata);
    // validation here
    return next();
}, function (req, res, next) {
    lotsDB.updateLotData(req.body.lotdata, req.params.id)
        .then(function (result) {
            const pathesArray = [];
            for (let i=0; i < req.files.length; i++) {
                pathesArray.push(req.files[i].path);
            }
            lotsDB.addLotImages(pathesArray, req.params.id)
                .then(function () {
                    return res.json({ message: 'ok' });
                })
                .catch(function (result) {
                    return res.status(result.status).json({ message: result.message });
                });
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
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