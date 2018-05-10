var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = require('./modules/config/connection').connectionObj.port;
var auth = require('./modules/routes/auth');
var signin = require('./modules/routes/signin');
var user = require('./modules/routes/user');
var lot = require('./modules/routes/lot');
var lots = require('./modules/routes/lots');
var http = require('http');

var server = http.createServer(app);
var io = module.exports.io = require('socket.io').listen(server);
var socketConfig = require('./modules/config/socketConfig');

io.on('connection', socketConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', auth);
app.use('/signin', signin);
app.use('/user', user);
app.use('/lot', lot);
app.use('/lots', lots);


server.listen(port, '0.0.0.0', function (error) {
    if (error) {
        console.log('Error:' + error.name + '\n');
    } else console.log('Listening port ' + port + '\n');
});