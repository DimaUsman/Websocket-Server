const WebSocket = require('ws');

// Create a WebSocket server instance.
const wss = new WebSocket.Server({ port: 5356 });

// Connection opened
wss.on('connection', function connection(ws) {
  console.log('A new client connected.');

  ws.on('message', function incoming(message) {
    console.log(`Received message => ${message}`);

    // Echo back the received message to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server started on port 5356');