var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketIo = require('socket.io');

var mainData = 0;

const absoluteDir = "C:/Users/Eric.Zhu/Desktop/Donkey Pictures/nodeTestApp";

app.use(express.static('public'));

var io = socketIo.listen(server);

app.get('/', function(req, res) {
	res.sendFile(absoluteDir + '/html/index.html');
});

app.get('/add', function(req, res) {
	console.log("/add just happened");
	mainData = parseFloat(mainData) + 0.5;
	io.sockets.emit("heard", mainData);
	res.status(200).send('YAY!!!');
});

app.get('/sub', function(req, res) {
	console.log("/sub just happened");
	mainData = parseFloat(mainData) - 0.5;
	io.sockets.emit("heard", mainData);
	res.status(200).send('YAY!!!');
});

app.get('/setinitialnumber/:data', function(req, res) {
	var data = req.params.data;
	console.log("/set initial just happened - " + JSON.stringify(data));
	mainData = data;
	io.sockets.emit("heard", mainData);
	res.status(200).send('Initial number set!');
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