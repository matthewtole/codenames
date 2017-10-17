import { EventEmitter } from 'events';
import * as io from 'socket.io-client';

import { EventType, BaseEvent, EventGameState, EventError, ErrorType } from '../../shared/events';
import { GameState, Coordinate, GameID } from '../../shared/game';
import { RoomTag } from '../../shared/rooms';

import config from '../config';

interface GameSocketOptions {
  url: string;
}

class GameSocket extends EventEmitter {
  private socket: SocketIOClient.Socket;
  private roomTag: RoomTag;
  private gameId: GameID;

  constructor(options: GameSocketOptions) {
    super();
    this.socket = io(options.url, {
      autoConnect: true,
      reconnection: true,
    });
    this.socket.on('event', (event: BaseEvent) => {
      switch (event.type) {
        case EventType.GameState:
          this.gameId = (event as EventGameState).gameId;
          this.emit('state', (event as EventGameState).state);
          break;
        case EventType.Error:
          this.emit('error', (event as EventError).error);
          break;
        default:
          // PASS
      }
    });
  }

  joinRoom(roomTag: RoomTag) {
    this.roomTag = roomTag;
    this.socket.send({
      roomTag,
      type: EventType.RoomJoin,
    });
  }

  clearMessage() {
    this.socket.send({
      roomTag: this.roomTag,
      gameId: this.gameId,
      type: EventType.MessageClear,
    });
  }

  endTurn() {
    this.socket.send({
      roomTag: this.roomTag,
      gameId: this.gameId,
      type: EventType.TurnEnd,
    });
  }

  newGame() {
    this.socket.send({
      roomTag: this.roomTag,
      type: EventType.GameCreate,
    });
  }

  revealCard(coordinate: Coordinate) {
    this.socket.send({
      coordinate,
      roomTag: this.roomTag,
      gameId: this.gameId,
      type: EventType.CardReveal,
    });
  }

  highlightCard(coordinate: Coordinate) {
    this.socket.send({
      coordinate,
      roomTag: this.roomTag,
      gameId: this.gameId,
      type: EventType.CardHighlight,
    });
  }
}

export const socket = new GameSocket({
  url: config.apiRoot,
});
