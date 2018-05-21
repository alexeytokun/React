const express = require('express');
const router = express.Router();
const lotsDB = require('../db/lots');
const errorsObj = require('../config/errors');
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: './public/lot_images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', (req, res, next) => {
        if (req.body.token !== 'admin' && req.body.token !== 'user') {
            return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
        }
        return next();
    }, upload.any(), (req, res, next) => {
        req.body.lotdata = JSON.parse(req.body.lotdata);
        // validation here
        return next();
    }, (req, res, next) => {
        lotsDB.addLotToDb(req.body.lotdata)
            .then(result => {
                let insertId = result.insertId;
                const pathesArray = [];
                for (let i=0; i < req.files.length; i++) {
                    pathesArray.push(req.files[i].path);
                }
                lotsDB.addLotImages(pathesArray, insertId)
                    .then(() => res.json({ message: 'ok' }))
                    .catch(result => res.status(result.status).json({ message: result.message }));
            })
            .catch(result => res.status(result.status).json({ message: result.message }));
});

router.post('/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, upload.any(), (req, res, next) => {
    req.body.lotdata = JSON.parse(req.body.lotdata);
    // validation here
    return next();
}, (req, res, next) => {
    lotsDB.updateLotData(req.body.lotdata, req.params.id)
        .then(result => {
            if(!req.files.length) return res.json({ message: 'ok' });

            const pathesArray = [];
            for (let i=0; i < req.files.length; i++) {
                pathesArray.push(req.files[i].path);
            }
            lotsDB.addLotImages(pathesArray, req.params.id)
                .then(() => res.json({ message: 'ok' }))
                .catch((result) => res.status(result.status).json({ message: result.message }));
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/categories', (req, res, next) => {
    lotsDB.getCategories()
        .then(result => res.json(result))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

module.exports = router;