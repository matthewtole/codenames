'use strict';

const assert = require('assert');
const Game = require('./game');
const rules = require('../data/rules');
const words = require('../data/words');
const messages = require('../data/messages');
const randomstring = require('randomstring');

class Room {
  constructor(options) {
    assert(options);
    assert(options.wordList);
    assert(words[options.wordList]);
    assert(options.ruleSet);
    assert(rules[options.ruleSet]);

    this._tag = options.tag || Room.generateRoomTag();
    this._options = options;
    this._sockets = [];
  }

  static generateRoomTag() {
    return randomstring.generate({
      length: 6,
      charset: 'alphabetic',
      capitalization: 'uppercase'
    });
  }

  get tag() {
    return this._tag;
  }

  setOptions(options) {
    this._options = options;
  }

  startGame() {
    this._game = new Game(this._options.wordList);
    this._game.on('change', () => {
      this._sockets.forEach((socket) => {
        socket.emit('game', this._game.state);
      });
    });
    this._game.on('event', (event) => {
      const rule = this.getRule(event.event, event.team);
      this._sockets.forEach((socket) => {
        socket.emit('message', `${messages[event.event]}<br>${rule}`);
      });
    });
  }

  getRule(event, team) {
    let rule = rules[this._options.ruleSet][event];
    if (!rule) {
      return null;
    }
    const otherTeam = team === Game.RED ? Game.BLUE : Game.RED;
    rule = rule.replace('{% team %}', team);
    rule = rule.replace('{% other_team %}', otherTeam);
    return rule;
  }

  attachSocket(socket) {
    this._sockets.push(socket);
    socket.emit('game', this._game.state);

    socket.on('highlight', (cell) => {
      this._game.highlight(cell.x, cell.y);
    });

    socket.on('reveal', (cell) => {
      this._game.reveal(cell.x, cell.y);
    });

    socket.on('message.clear', () => {
      this._sockets.forEach((socket) => {
        socket.emit('message', null);
      });
    });

    socket.on('turn.end', () => {
      this._.game.switchTurn();
      this._sockets.forEach((socket) => {
        socket.emit('game', this._game.state);
      });
    });

    socket.on('new_round', (wordList, ruleSet) => {
      this.setOptions({ wordList, ruleSet });
      this.startGame();
      this._sockets.forEach((socket) => {
        socket.emit('game', this._game.state);
      });
    });
  }
}

module.exports = Room;
