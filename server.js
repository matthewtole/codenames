'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');
const RoomManager = require('./lib/room-manager');

app.use(express.static('public'));
app.use(express.static('dist'));

const roomManager = new RoomManager();
roomManager.load();

io.on('connection', (socket) => {
  socket.on('room.create', (wordList, ruleSet) => {
    const room = roomManager.createRoom({ wordList, ruleSet });
    room.startGame();
    socket.emit('game.created', room.tag);
    socket.emit('message', `Room Tag: ${room.tag}`);
  });

  socket.on('room.join', (roomTag) => {
    const room = roomManager.getRoom(roomTag);
    if (!room) {
      socket.emit('room.error');
      return;
    }
    room.attachSocket(socket);
    socket.roomTag = roomTag;
  });
});

http.listen(config.port, () => {
  console.log(`Codenames server running at http://localhost:${config.port}`);
});
