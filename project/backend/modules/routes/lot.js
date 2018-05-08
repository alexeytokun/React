var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log('ok');
// }, function (req, res, next) {
//     if (!validate(req.body)) {
//         return res.status(406).json({ message: errorsObj.VALIDATION });
//     } else next();
// }, function (req, res, next) {
//     hashingObj.hash(req.body.pass)
//         .then(function (result) {
//             req.body.pass = result;
//             next();
//         })
//         .catch(function (result) {
//             return res.status(result.status).json({ message: result.message });
//         });
// }, function (req, res, next) {
//     dbObj.addUserToDb(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.pass)
//         .then(function (result) {
//             return res.json({ message: result.insertId });
//         })
//         .catch(function (result) {
//             return res.status(result.status).json({ message: result.message });
//         });
});

module.exports = router;