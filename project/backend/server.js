const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = require('./modules/config/connection').connectionObj.port;
const auth = require('./modules/routes/auth');
const signin = require('./modules/routes/signin');
const user = require('./modules/routes/user');
const lot = require('./modules/routes/lot');
const lots = require('./modules/routes/lots');
const http = require('http');

const server = http.createServer(app);
const io = module.exports.io = require('socket.io').listen(server);
const socketConfig = require('./modules/config/socketConfig');

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


server.listen(port, '0.0.0.0', error => {
    if (error) {
        console.log('Error:' + error.name + '\n');
    } else console.log('Listening port ' + port + '\n');
});