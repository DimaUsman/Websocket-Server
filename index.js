const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: process.env.port,headers: {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "http://localhost:3000",
  "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
}} );


wss.on('connection', function connection(ws) {

    console.log('Client connected');


    ws.on('message', function incoming(message) {

        console.log('Received: %s', message);

        ws.send(`${message}`);
    });


    ws.on('close', function () {
        console.log('Client disconnected');
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