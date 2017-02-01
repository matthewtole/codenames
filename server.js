'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require('./lib/game');
const ActionList = require('./data/actions');

app.use(express.static('public'));

const games = {};

function generateGameTag() {
  return 'ABCDEF';
}

function getAction(event, team, actions) {
  const action = ActionList[actions][event];
  action.replace('{% team %}', team);
  return action;
}

function emitAll(game, event, data) {
  if (game.viewer) {
    game.viewer.emit(event, data);
  }
  if (game.controller) {
    game.controller.emit(event, data);
  }
}

io.on('connection', (socket) => {

  socket.on('create', (mode) => {
    const game = new Game(mode);
    const gameTag = generateGameTag();
    games[gameTag] = {
      game,
      controller: socket,
      actions: 'default'
    };
    socket.gameTag = gameTag;
    socket.emit('game', game.state);

    game.on('change', () => {
      emitAll(games[gameTag], 'game', game.state);
    });

    game.on('event', (event) => {
      emitAll(games[gameTag], 'message', getAction(event.event, event.team, games[gameTag].actions));
    });
  });

  socket.on('join', (tag) => {
    if (! games[tag]) {
      return;
    }
    games[tag].viewer = socket;
    socket.gameTag = tag;
    socket.emit('game', games[tag].game.state);
  });

  socket.on('highlight', (cell) => {
    if (! games[socket.gameTag]) {
      return;
    }
    const game = games[socket.gameTag].game;
    game.highlight(cell.x, cell.y);
  });

  socket.on('reveal', (cell) => {
    if (! games[socket.gameTag]) {
      return;
    }
    const game = games[socket.gameTag].game;
    game.reveal(cell.x, cell.y);
  });
});

http.listen(7777, function () {
  console.log('Codenames running on port 7777!')
});
