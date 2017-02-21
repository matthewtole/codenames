'use strict';

const assert = require('assert');
const Game = require('./game');
const rules = require('../data/rules');
const words = require('../data/words');
const messages = require('../data/messages');
const randomstring = require('randomstring');

/**
 * Class to describe a Room, which is what manages the
 * interactions between the users.
 */
class Room {

  /**
   * @constructor
   * @param {Object} options - Configuration options
   * @param {String} options.wordList - The word list to use
   * @param {String} options.ruleSet - The additional rules to use
   * @param {String} [options.tag] - The tag for the room
   */
  constructor(options) {
    assert(options);
    assert(options.wordList);
    assert(words[options.wordList]);
    assert(options.ruleSet);
    assert(rules[options.ruleSet]);

    this._tag = options.tag || Room._generateRoomTag();
    this._options = options;
    this._sockets = [];
  }

  /**
   * Static class method for generating a tag for the room.
   * @returns {String} Random 6 letter tag
   * @private
   */
  static _generateRoomTag() {
    return randomstring.generate({
      length: 6,
      charset: 'alphabetic',
      capitalization: 'uppercase'
    });
  }

  /**
   * Get the tag for the room
   * @returns {String} The room tag
   */
  get tag() {
    return this._tag;
  }

  /**
   * Change the configuration options for the room.
   * @param {Object} options - Configuration options
   * @param {String} options.wordList - The word list to use
   * @param {String} options.ruleSet - The additional rules to use
   * @returns {undefined}
   */
  setOptions(options) {
    this._options = options;
  }

  /**
   * Starts a new game in the room based on the provided options.
   * @returns {undefined}
   */
  startGame() {
    this._game = new Game(this._options.wordList);
    this._game.on('change', () => {
      this._sockets.forEach((socket) => {
        socket.emit('game', this._game.state);
      });
    });
    this._game.on('event', (event) => {
      const rule = this._getRule(event.event, event.team);
      this._sockets.forEach((socket) => {
        socket.emit('message', `${messages[event.event]}<br>${rule}`);
      });
    });
  }

  /**
   * Get the rule text for a given event and team.
   * @param {String} event - Event name
   * @param {String} team - Team name
   * @returns {String} The rule text to send to the user
   * @private
   */
  _getRule(event, team) {
    let rule = rules[this._options.ruleSet][event];
    if (!rule) {
      return null;
    }
    const otherTeam = team === Game.RED ? Game.BLUE : Game.RED;
    rule = rule.replace('{% team %}', team);
    rule = rule.replace('{% other_team %}', otherTeam);
    return rule;
  }

  /**
   * Attach a connected websocket to the room.
   * Handles setting up all of the event handlers.
   * @param {WebSocket} socket - Connected websocket to attach
   * @returns {undefined}
   */
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
      this._game.switchTurn();
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
