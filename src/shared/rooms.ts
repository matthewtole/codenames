import * as RuleSets from './data/rules';
import { original, words as WordLists } from './data/words';
import { GameID } from './game';

export interface RoomOptions {
  words: string;
  rules: string;
}

export interface Room extends RoomOptions {
  tag: RoomTag;
  createdAt: Date;
  lastAccessed: Date;
  gameId?: GameID;
}

export type RoomTag = string;

const TAG_SIZE = 2;

/**
 * Room Managagement class.
 */
export class Rooms {
  /**
   * The list of current rooms.
   */
  rooms: { [key: string]: Room; };

  constructor() {
    this.rooms = {};
  }

  /**
   * Create a new room given a set of options.
   * @param roomOptions The options to use when creating the room
   */
  createRoom(roomOptions: RoomOptions): Room {
    const err = Rooms.validateOptions(roomOptions);
    if (err !== undefined) { throw err; }

    let tag: RoomTag;
    // TODO: Handle the situation where we have EVERY possible room tag!
    while (tag === undefined || this.rooms.hasOwnProperty(tag)) {
      tag = Rooms.generateRoomTag();
    }
    this.rooms[tag] = {
      tag,
      ...roomOptions,
      createdAt: new Date(),
      lastAccessed: new Date(),
    };
    return this.rooms[tag];
  }

  /**
   * Get a room given its tag. Returns undefined if there is no room with that tag.
   * @param tag The tag of the room to find.
   */
  getRoom(tag: RoomTag): Room | undefined {
    const room = this.rooms[tag];
    if (room === undefined) { return undefined; }
    room.lastAccessed = new Date();
    return room;
  }

  /**
   * Clean up rooms that haven't been accessed in over 24 hours.
   */
  purgeOldRooms() {
    const now = new Date().getTime();
    for (const tag in this.rooms) {
      const room = this.rooms[tag];
      const age = now - room.lastAccessed.getTime();
      if (age > 1000 * 60 * 60 * 24) {
        this.deleteRoom(tag);
      }
    }
  }

  /**
   * Delete a room by its tag.
   * @param tag The tag of the room to delete.
   */
  private deleteRoom(tag: RoomTag): void {
    delete this.rooms[tag];
  }

  /**
   * Generates a new random room tag by combining ROOM_TAG words from the original word list.
   * @returns A randomly generated room tag
   * TODO: Only use words that don't have a space or punctuation
   */
  private static generateRoomTag(): RoomTag {
    const indexes: number[] = [];
    for (let i = 0; i < TAG_SIZE; i += 1) {
      let index = -1;
      while (index < 0 || indexes.indexOf(index) >= 0) {
        index = Math.floor(Math.random() * original.length);
      }
      indexes.push(index);
    }
    return indexes.map(index => original[index].toLowerCase()).join('-');
  }

  /**
   * Validate an RoomOptions object to ensure it contains good options.
   * @param options The RoomOptions object to validate
   * @returns An Error object if there is an issue, undefined otherwise
   */
  private static validateOptions(options: RoomOptions) {
    if (!WordLists.hasOwnProperty(options.words)) {
      return new Error(`The specified word list "${options.words}" does not exist!`);
    }
    if (!RuleSets.hasOwnProperty(options.rules)) {
      return new Error(`The specified rules "${options.rules}" does not exist!`);
    }
  }
}
