var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var sugar = require('sugar');

//var http = require('http').Server(app);
//var io = require('socket.io')(http);

//app.get('/', function(req, res){
//    res.sendFile(__dirname + '/index.html');
//});
app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(8080);

var clients = [];
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
    clients.push(ws);
    //clients << ws;
    console.log("client count: " + clients.count());

    console.log("user connected");
    ws.on('message', function(message) {
        console.log('received: %s', message);
        clients.forEach(function(client) {
            if(client != ws) client.send(message);
        });
    });
    ws.onclose = function(event) {
        console.log("Closing a socket.");
        clients.remove(ws);
        //clients.filter(function(client){return client !== ws;})
    };
//    ws.send('something');
});


/*
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});
*/

//http.listen(3000, function(){
//    console.log('listening on *:3000');
//});
