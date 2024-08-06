const WebSocket = require('ws');
let clients = new Set();

const wss = new WebSocket.Server({ port: process.env.port,headers: {
  "Access-Control-Allow-Origin": "*"
  //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
}} );

//const wss = new WebSocket.Server({ port: 5357});

wss.on('connection', function connection(ws) {

   clients.add(ws);
    console.log('Client connected');


    ws.on('message', function incoming(message) {

        console.log('Received: %s', message);

        clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message.data);
          }
        });
    });


    ws.on('close', () => {
      console.log(`Client disconnected. Total clients: ${clients.size - 1}`);
      clients.delete(ws);
    });
});


// Implementing a shutdown hook for graceful shutdown
