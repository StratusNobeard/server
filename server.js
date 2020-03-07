
var http = require('http');
var express = require('express');
var WSS = require('ws').Server;
var onConnections = 0;
var app = express().use(express.static('public'));
var server = http.createServer(app);
server.listen(8090, '127.0.0.1');
var wss = new WSS({ port: 8091 });
wss.on('connection', function(socket) {
  onConnections += 1;
  console.log(onConnections);
  console.log('Opened Connection');

  // var json = JSON.stringify({ message: 'Gotcha' });
  // socket.send(json);
  // console.log('Sent: ' + json);

  socket.on('message', function(message) {
    console.log('Received: ' + message);

    wss.clients.forEach(function each(client) {
      client.send(message);
    });
  });

  socket.on('close', function() {
    onConnections -= 1;
    console.log(onConnections);
    console.log('Closed Connection');
  });

});

var broadcast = function() {
  var json = JSON.stringify({
    message: 'Hello hello!'
  });

  wss.clients.forEach(function each(client) {
    client.send(json);
    console.log('Sent: ' + json);
  });
}
//setInterval(broadcast, 3000);
