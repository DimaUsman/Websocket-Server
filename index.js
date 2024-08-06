const WebSocket = require('ws');
let clients = new Set();

const wss = new WebSocket.Server({ port: process.env.port,headers: {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
}} );


wss.on('connection', function connection(ws) {
   clients.add(ws);
    console.log('Client connected');


    wss.on('message', function incoming(message) {

        console.log('Received: %s', message);

        clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
    });


    ws.on('close', () => {
      console.log(`Client disconnected. Total clients: ${clients.size - 1}`);
      clients.delete(ws);
    });
});


// Implementing a shutdown hook for graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    
    // Close all WebSocket connections gracefully
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.close();
        console.log('Client connection closed during shutdown');
      }
    });
    
    // Forcefully close the server after all connections have been closed
    setTimeout(() => {
      process.exit(0); // Exit cleanly
    }, 1000); // Adjust timeout as needed
  });