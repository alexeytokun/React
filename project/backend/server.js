var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = require('./modules/config/connection').connectionObj.port;
var auth = require('./modules/routes/auth');
var signin = require('./modules/routes/signin');
var user = require('./modules/routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', auth);
app.use('/signin', signin);
app.use('/user', user);


app.listen(port, function (error) {
    if (error) {
        console.log('Error:' + error.name + '\n');
    } else console.log('Listening port ' + port + '\n');
});