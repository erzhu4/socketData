var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketIo = require('socket.io');

const absoluteDir = "ABSOLUTE DIR!!";

app.use(express.static('public'));

var io = socketIo.listen(server);

app.get('/', function(req, res) {
	res.sendFile(absoluteDir + '/html/index.html');
});

app.get('/data/:data', function(req, res) {
	var data = req.params.data;
	io.sockets.emit("heard", data);
	res.status(200).send('OK!');
});

io.sockets.on('connection', function(socket){
	console.log("Socket connected!!!");
});

server.listen(1000, function() {
  	console.log('Server listening on port 1000!');
});