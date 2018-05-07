var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = require('./modules/config/connection').connectionObj.port;
var auth = require('./modules/routes/auth');
var signin = require('./modules/routes/signin');
var user = require('./modules/routes/user');
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    socket.emit('news', 'Good News');

    socket.on('send', function (data) {
       io.emit('news', data);
        console.log(data);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', auth);
app.use('/signin', signin);
app.use('/user', user);


server.listen(port, function (error) {
    if (error) {
        console.log('Error:' + error.name + '\n');
    } else console.log('Listening port ' + port + '\n');
});