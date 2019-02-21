var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketIo = require('socket.io');

var mainData = null;

const absoluteDir = "C:/Users/Eric.Zhu/Desktop/Donkey Pictures/nodeTestApp";

app.use(express.static('public'));

var io = socketIo.listen(server);

app.get('/', function(req, res) {
	res.sendFile(absoluteDir + '/html/index.html');
});

app.get('/data/:data', function(req, res) {
	var data = req.params.data;
	console.log("/data just happened - " + JSON.stringify(data));
	mainData = data;
	io.sockets.emit("heard", mainData);
	res.status(200).send('OK!');
});

io.sockets.on('connection', function(socket){
	console.log("Someone Connected!!!");
	io.sockets.emit("heard", mainData);
	socket.on('disconnect', function() {
        console.log('Someone disconnected :(');
    });
});
server.listen(1000, function() {
  	console.log('Server listening on port 1000!');
});