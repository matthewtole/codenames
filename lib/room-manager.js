'use strict';

const Room = require('./room');

/**
 * RoomManager class. Handles loading and saving of the rooms.
 */
class RoomManager {

  /**
   * @constructor
   */
  constructor() {
    this._rooms = {};
  }

  /**
   * Get a room given its tag.
   * @param {String} tag - Room tag
   * @returns {Room} The room with the given tag
   */
  getRoom(tag) {
    return this._rooms[tag] || null;
  }

  /**
   * Create a new room with some given options.
   * @param {Object} options - Configuration options
   * @param {String} options.wordList - The word list to use
   * @param {String} options.ruleSet - The additional rules to use
   * @param {String} [options.tag] - The tag for the room
   * @returns {Room} The newly created room
   */
  createRoom(options) {
    const room = new Room(options);
    this._rooms[room.tag] = room;
    return room;
  }

  /**
   * Load saved rooms from disk into memory.
   * @returns {undefined}
   */
  load() {
    this.createRoom({
      wordList: 'original',
      ruleSet: 'default',
      tag: 'ABCDEF'
    }).startGame();
  }
}

module.exports = RoomManager;
