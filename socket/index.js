
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Create an Express app and a basic HTTP server
const app = express();
const server = http.createServer(app);



// Attach Socket.IO to the server
const io = socketIO(server, {
    cors: {
      origin: '*',
    }
});

let users = [];
const addUser = (userData, socketId) => {
    users.some(user =>user.sub === userData.sub) && (users.push({ ...userData, socketId: socketId}));
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);

}
// Define a connection event handler
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle messages
  socket.on('addUser', (data) => {
      addUser(data, socket.id);
      io.emit("getUsers", users)
    // Broadcast the message to all connected clients
    // io.emit('message', data);
  });

  socket.on('sendMessage', (data) => {
    const user = getUser(data.receiverId);
    let socketId = user?.socketId !== undefined
    io.to(socketId).emit("getMessage", data)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 9000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});