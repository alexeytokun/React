const express = require('express');
const router = express.Router();
const lotsDB = require('../db/lots');
const errorsObj = require('../config/errors');
const path = require('path');
const multer  = require('multer');
const validate = require('../config/validation').lot;

const storage = multer.diskStorage({
    destination: './public/lot_images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Math.floor(Math.random() * 1000) + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/:id', (req, res, next) => {
    lotsDB.getLotData(req.params.id)
        .then(result => {
            if(!result.length) {
                throw {status: 406, message: errorsObj.WRONG_ID};
            }
            req.body.lot = result[0];
            return lotsDB.getLotImages(req.params.id);
        })
        .then(results => {
                let filtered = results
                    .map((img) => {
                        return {path: img.image, image_id: img.image_id}
                    });
                req.body.lot.images = filtered;
            return res.json({ lot: req.body.lot });
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.post('/', (req, res, next) => {
        if (req.body.token !== 'admin' && req.body.token !== 'user') {
            return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
        }
        return next();
    }, upload.any(), (req, res, next) => {
        req.body.lotdata = JSON.parse(req.body.lotdata);
        if (!validate(req.body.lotdata)) {
            return res.status(406).json({ message: errorsObj.VALIDATION });
        } else next();
    }, (req, res, next) => {
        lotsDB.addLotToDb(req.body.lotdata)
            .then(result => {
                if(!req.files.length) return res.json({ message: 'ok' });
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
        if (!validate(req.body.lotdata)) {
            return res.status(406).json({ message: errorsObj.VALIDATION });
        } else next();
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

router.delete('/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    lotsDB.deleteLot(req.params.id)
        .then(function (result) {
            if (result.affectedRows !== 0) {
                return res.status(200).json({message: 'Lot deleted'});
            }
            return res.status(406).json({message: errorsObj.WRONG_ID});
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.delete('/image/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    lotsDB.deleteLotImage(req.params.id)
        .then(function (result) {
            if (result.affectedRows !== 0) {
                return res.status(200).json({message: 'Image deleted'});
            }
            return res.status(406).json({message: errorsObj.WRONG_ID});
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/won/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    lotsDB.getWonLots(req.params.id)
        .then(results => {
            let lots = [];
            if (results.length) {
                lots = results.map(
                    (lot) => lot.lot_id
                );
            }
            return res.status(200).json({lots: lots});
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/categories', (req, res, next) => {
    lotsDB.getCategories()
        .then(result => res.json(result))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/comments/:id', (req, res, next) => {
    lotsDB.getComments(req.params.id)
        .then(results => {
            let comments = [];
            if (results.length) {
                for (let i = 0; i < results.length; i++) {
                    if (!results[i].reply) {
                        comments.push(results[i]);
                        continue;
                    }
                    let parent = results.find((item) => item.comment_id === results[i].reply);
                    if(!parent) {
                        comments.push(results[i]);
                        continue;
                    }
                    if(!parent.replies) parent.replies = [];
                    parent.replies.push(results[i]);
                }
            }
            return res.status(200).json({comments: comments});
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.post('/comment/new', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    // if (!validate(req.body.comment)) {
    //     return res.status(406).json({ message: errorsObj.VALIDATION });
    // } else next();
   return next();
}, (req, res, next) => {
    console.log(req.body);
    lotsDB.addComment(req.body.comment)
        .then(() => res.json({ message: 'ok' }))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.post('/comment/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    // if (!validate(req.body.comment)) {
    //     return res.status(406).json({ message: errorsObj.VALIDATION });
    // } else next();
    return next();
}, (req, res, next) => {
    console.log(req.body);
    lotsDB.editComment(req.body.comment, req.params.id)
        .then(() => res.json({ message: 'ok' }))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

module.exports = router;