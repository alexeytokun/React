var express = require('express');
var router = express.Router();
var dbObj = require('../db/users');
var errorsObj = require('../config/errors');
var validate = require('../config/validation');
var hashingObj = require('../config/hashing');
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var fileType = require('file-type');
var gm = require('gm').subClass({imageMagick: true});

var storage = multer.diskStorage({
    destination: './public/avatars',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

router.post('/', function (req, res, next) {
    dbObj.isUnique(req.body.username)
        .then(function () {
            next();
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
}, function (req, res, next) {
    if (!validate(req.body)) {
        return res.status(406).json({ message: errorsObj.VALIDATION });
    } else next();
}, function (req, res, next) {
    hashingObj.hash(req.body.pass)
        .then(function (result) {
            req.body.pass = result;
            next();
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
}, function (req, res, next) {
    dbObj.addUserToDb(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.pass)
        .then(function (result) {
            return res.json({ message: result.insertId });
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
});

router.get('/:id', function (req, res, next) {
    dbObj.getUserById(req.params.id)
        .then(function (result) {
            if (result.length) {
                res.json(result[0]);
            } else {
                res.status(400).json({ message: errorsObj.WRONG_ID });
            }
        })
        .catch(function (result) {
            res.status(result.status).json({ message: result.message });
        });
});

router.get('/avatar/:id', function (req, res, next) {
    dbObj.getAvatar(req.params.id)
        .then(function (result) {
            if (result.length) {
                res.json({source: result[0].avatar});
            } else {
                res.status(400).json({ message: errorsObj.WRONG_ID });
            }
        })
        .catch(function (result) {
            res.status(result.status).json({ message: result.message });
        });
});

router.post('/avatar/:id', function (req, res, next) {
    if (!+req.params.id) {
        res.status(400).json({ message: errorsObj.WRONG_ID });
    } else next();
}, upload.single('avatar'), function (req, res, next) {
    gm(req.file.path)
        .resize('200', '200', '^')
        .gravity('Center')
        .crop('200', '200')
        .write(req.file.path, function (err) {
            if (err) console.log(err);
            dbObj.setAvatar(req.file.path, req.params.id)
                .then(function (result) {
                    return res.json({ message: 'Avatar updated' });
                })
                .catch(function (result) {
                    return res.status(result.status).json({ message: result.message });
                });
        })
});

router.post('/:id', function (req, res, next) {
    if (req.body.token !== 'admin' || req.body.token !== 'user') {
        return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
    }
    return next();
}, function (req, res, next) {
    if ((req.body.pass === '') ? !validate(req.body, true) : !validate(req.body)) {
        return res.status(406).json({ message: errorsObj.VALIDATION });
    }
    return next();
}, function (req, res, next) {
    dbObj.isUnique(req.body.username, req.params.id)
        .then(function (result) {
            next();
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
}, function (req, res, next) {
    if (req.body.pass === '') return next();
    hashingObj.hash(req.body.pass)
        .then(function (result) {
            req.body.pass = result;
            next();
        })
        .catch(function (result) {
            return res.status(result.status).json({ message: result.message });
        });
}, function (req, res, next) {
    dbObj.updateUserData(req.params.id, req.body)
        .then(function (result) {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(function (result) {
            res.status(result.status).json({ message: result.message });
        });
});

// router.delete('/:id', function (req, res, next) {
//     if (req.body.token !== 'admin') {
//         return res.status(403).json({ message: errorsObj.ACCESS_DENIED });
//     }
//     return next();
// }, function (req, res, next) {
//     dbObj.deleteUser(req.params.id)
//         .then(function (result) {
//             if (result.id) {
//                 return dbObj.deleteUnusedToken(result.id)
//                     .then(function () {
//                         return res.status(result.status).json({ message: result.message });
//                     });
//             }
//             return res.status(result.status).json({ message: result.message });
//         })
//         .catch(function (result) {
//             res.status(result.status).json({ message: result.message });
//         });
// });

module.exports = router;
