var http = require('http');
//npm modules (need to install these first)
var WebSocketServer = require('ws').Server; //provides web sockets
var ecStatic = require('ecstatic');  //provides static file server service

//module containing useful methods
var color = require('./assignID');
//console.log(chessMethods.test());

//static file server
var server = http.createServer(ecStatic({root: __dirname + '/www'}));

//var count = 0;

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log('Client connected');



  ws.on('message', function(msg) {
	   //This is the arr
	   var boardLocation = msg;
     broadcast(boardLocation);
  });

  /*if (wss.clients.length % 2 == 0) {
    ws.id = 'WHITE';
  }
  else {
    ws.id = 'BLACK';
  }*/

  ws.id = color.assignID(wss.clients.length);

  //console.log(ws.id);

  var playeColor = JSON.stringify(ws.id);

  ws.send(playeColor);
});

function broadcast(msg) {
  wss.clients.forEach(function(client) {
    client.send(msg);
  });

}

server.listen(3000);
