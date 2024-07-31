
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // This allows connections from any origin. Adjust this according to your needs.
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log(data); // Log received message
    socket.emit('message', data); // Echo received message back to the client
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
