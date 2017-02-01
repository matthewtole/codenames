'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require('./lib/game');
const config = require('./config');
const { generateGameTag, getRule, emitAll } = require('./lib/utils');

app.use(express.static('public'));

const games = {};

io.on('connection', (socket) => {

  socket.on('create', (mode, ruleSet) => {
    const game = new Game(mode);
    const gameTag = generateGameTag();
    games[gameTag] = {
      game,
      sockets: [],
      ruleSet: ruleSet
    };

    socket.emit('game.created', gameTag);

    game.on('change', () => {
      emitAll(games[gameTag], 'game', game.state);
    });

    game.on('event', (event) => {
      const rule = getRule(event.event, event.team, games[gameTag].ruleSet);
      emitAll(games[gameTag], 'message', rule);
    });
  });

  socket.on('list', () => {
    socket.emit('game.list', games);
  });

  socket.on('join', (tag) => {
    if (!games[tag]) {
      return;
    }
    games[tag].sockets.push(socket);
    socket.gameTag = tag;
    socket.emit('game', games[tag].game.state);
  });

  socket.on('highlight', (cell) => {
    if (!games[socket.gameTag]) {
      return;
    }
    const game = games[socket.gameTag].game;
    game.highlight(cell.x, cell.y);
  });

  socket.on('reveal', (cell) => {
    if (!games[socket.gameTag]) {
      return;
    }
    const game = games[socket.gameTag].game;
    game.reveal(cell.x, cell.y);
  });

  socket.on('message.clear', () => {
    emitAll(games[socket.gameTag], 'message', null);
  });

  socket.on('turn.end', () => {
    const game = games[socket.gameTag];
    game.game.switchTurn();
    emitAll(game, 'game', game.game.state);
  });
});

http.listen(config.port, () => {
  console.log(`Codenames server running on port ${config.port}!`);
});
