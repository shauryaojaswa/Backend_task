const express = require('express');

const app = express();


const server = require('http').createServer(app);
//combining http and app to use socket.io
// Here Express app is used as the request handler for the server.


const io = require('socket.io')(server);
//socket.io is attached to the server instance

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Handle new message event
  socket.on('new-message', (message) => {
    console.log(`Received new message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('new-message', message);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});