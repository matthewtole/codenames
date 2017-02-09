'use strict';

const Room = require('./room');

class RoomManager {
  constructor() {
    this._rooms = {};
  }

  getRoom(tag) {
    return this._rooms[tag] || tag;
  }

  createRoom(options) {
    const room = new Room(options);
    this._rooms[room.tag] = room;
    return room;
  }

  load() {
    this.createRoom({
      wordList: 'original',
      ruleSet: 'default',
      tag: 'ABCDEF'
    }).startGame();
  }
};

module.exports = RoomManager;
