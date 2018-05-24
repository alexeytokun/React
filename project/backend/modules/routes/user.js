const express = require('express');
const router = express.Router();
const dbObj = require('../db/users');
const errorsObj = require('../config/errors');
const validate = require('../config/validation').user;
const hashingObj = require('../config/hashing');
const path = require('path');
const multer  = require('multer');
const gm = require('gm').subClass({imageMagick: true});

const storage = multer.diskStorage({
    destination: './public/avatars',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/', (req, res, next) => {
    dbObj.isUnique(req.body.username)
        .then(() => next())
        .catch((result) => res.status(result.status).json({ message: result.message }));
}, (req, res, next) => {
    if (!validate(req.body)) {
        return res.status(406).json({ message: errorsObj.VALIDATION });
    } else next();
}, (req, res, next) => {
    hashingObj.hash(req.body.pass)
        .then(result => {
            req.body.pass = result;
            next();
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
}, (req, res, next) => {
    dbObj.addUserToDb(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.pass)
        .then(result => res.json({ message: result.insertId }))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/:id', (req, res, next) => {
    dbObj.getUserById(req.params.id)
        .then(result => {
            if (result.length) {
                res.json(result[0]);
            } else {
                res.status(400).json({ message: errorsObj.WRONG_ID });
            }
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.get('/avatar/:id', (req, res, next) => {
    dbObj.getAvatar(req.params.id)
        .then(result => {
            if (result.length) {
                res.json({source: result[0].avatar});
            } else {
                res.status(400).json({ message: errorsObj.WRONG_ID });
            }
        })
        .catch(result => res.status(result.status).json({ message: result.message }));
});

router.post('/avatar/:id', (req, res, next) => {
    if (!+req.params.id) {
        res.status(400).json({ message: errorsObj.WRONG_ID });
    } else next();
}, (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, upload.single('avatar'), (req, res, next) => {
    gm(req.file.path)
        .resize('200', '200', '^')
        .gravity('Center')
        .crop('200', '200')
        .write(req.file.path, err => {
            if (err) console.log(err);
            dbObj.setAvatar(req.file.path, req.params.id)
                .then(result => res.json({ message: 'Avatar updated' }))
                .catch(result => res.status(result.status).json({ message: result.message }));
        })
});

router.post('/:id', (req, res, next) => {
    if (req.body.token !== 'admin' && req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, (req, res, next) => {
    if ((req.body.pass === '') ? !validate(req.body, true) : !validate(req.body)) {
        return res.status(406).json({ message: errorsObj.VALIDATION });
    }
    return next();
}, (req, res, next) => {
    dbObj.isUnique(req.body.username, req.params.id)
        .then(result => next())
        .catch(result => res.status(result.status).json({ message: result.message }));
}, (req, res, next) => {
    if (req.body.pass === '') return next();
    hashingObj.hash(req.body.pass)
        .then(result => {
            req.body.pass = result;
            next();
        })
        .catch(result =>res.status(result.status).json({ message: result.message }));
}, (req, res, next) => {
    dbObj.updateUserData(req.params.id, req.body)
        .then(result => res.status(result.status).json({ message: result.message }))
        .catch(result => res.status(result.status).json({ message: result.message }));
});

module.exports = router;
