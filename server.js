'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require('./lib/game');
const Rules = require('./data/rules');
const config = require('./config');

app.use(express.static('public'));

const games = {};

function generateGameTag() {
  return 'ABCDEF';
}

function getRule(event, team, ruleSet) {
  let rule = Rules[ruleSet][event];
  rule = rule.replace('{% team %}', team);
  rule = rule.replace('{% other_team %}', team === Game.RED ? Game.BLUE : Game.RED);
  return rule;
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

  socket.on('create', (mode, ruleSet) => {
    const game = new Game(mode);
    const gameTag = generateGameTag();
    games[gameTag] = {
      game,
      controller: socket,
      ruleSet: ruleSet
    };

    socket.emit('game.created', gameTag);

    game.on('change', () => {
      emitAll(games[gameTag], 'game', game.state);
    });

    game.on('event', (event) => {
      emitAll(games[gameTag], 'message', getRule(event.event, event.team, games[gameTag].ruleSet));
    });
  });

  socket.on('list', () => {
    socket.emit('game.list', games);
  });

  socket.on('join', (tag, role) => {
    if (! games[tag]) {
      return;
    }
    games[tag][role] = socket;
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

  socket.on('message.clear', () => {
    emitAll(games[socket.gameTag], 'message', null);
  })
});

http.listen(config.port, function () {
  console.log(`Codenames server running on port ${config.port}!`);
});
