'use strict';

require('dotenv').load();
const PORT = process.env.PORT || 3000;
const MONGO_URL = "mongodb://localhost/photo-album";

var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var socket1 = require('./socket_template');
var path = require('path');
var mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  res.handle = (err, data) => {
    res.status(err ? 400 : 200).send(err || data);
  };
  next();
});
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));

io.on('connection', (socket) => {
  console.log('Client connected');
  socket1.init(io, socket);
});

server.listen(PORT, err => {
  console.log(err || `Server listening on PORT ${PORT}`);
});
mongoose.connect(MONGO_URL, err => {
  console.log(err || `MONGOdb @ 'photo-album'`);
});

module.exports = app;
