import * as winston from 'winston';
import {
  BaseEvent,
  ErrorType,
  EventCardHighlight,
  EventCardReveal,
  EventError,
  EventGame,
  EventGameCreate,
  EventGameCreated,
  EventGameState,
  EventMessageClear,
  EventRoomCreate,
  EventRoomCreated,
  EventRoomJoin,
  EventRoomJoined,
  EventTurnEnd,
  EventType,
} from './shared/events';
import { Game, GameID, GameOptions } from './shared/game';
import { Games } from './shared/games';
import { Room, Rooms } from './shared/rooms';

export class EventHandler {
  private games: Games;
  private rooms: Rooms;
  private io: SocketIO.Server;

  constructor(games: Games, rooms: Rooms, io: SocketIO.Server) {
    this.games = games;
    this.rooms = rooms;
    this.io = io;
  }

  handleEvent(event: BaseEvent, socket: SocketIO.Socket) {
    switch (event.type) {
      case EventType.RoomCreate:
        this.handleRoomCreateEvent(event as EventRoomCreate, socket);
        break;
      case EventType.RoomJoin:
        this.handleRoomJoinEvent(event as EventRoomJoin, socket);
        break;
      case EventType.GameCreate:
        this.handleGameCreateEvent(event as EventGameCreate, socket);
        break;
      case EventType.CardReveal:
        this.handleCardRevealEvent(event as EventCardReveal, socket);
        break;
      case EventType.CardHighlight:
        this.handleCardHighlightEvent(event as EventCardHighlight, socket);
        break;
      case EventType.TurnEnd:
        this.handleTurnEndEvent(event as EventTurnEnd, socket);
        break;
      case EventType.MessageClear:
        this.handleEventMessageClear(event as EventMessageClear, socket);
        break;
      default:
        winston.log('info', `Unknown socket Event type: ${EventType[event.type]}`);
    }
  }

  private handleRoomCreateEvent(event: EventRoomCreate, socket: SocketIO.Socket) {
    const { tag: roomTag } = this.rooms.createRoom(event.options);
    const response = {
      roomTag,
      type: EventType.RoomCreated,
    } as EventRoomCreated;
    socket.send(response);
  }

  private handleRoomJoinEvent(event: EventRoomJoin, socket: SocketIO.Socket) {
    const tag = (event as EventRoomJoin).roomTag;
    const room = this.rooms.getRoom(tag);
    if (room === undefined) {
      this.sendError(ErrorType.ROOM_NOT_FOUND, socket);
      return;
    }
    socket.join(room.tag);
    const response = {
      type: EventType.RoomJoined,
      roomTag: room.tag,
    } as EventRoomJoined;
    socket.send(response);
    if (room.gameId !== undefined) {
      this.broadcastGameState(room.gameId, room.tag);
    }
  }

  private handleGameCreateEvent(event: EventGameCreate, socket: SocketIO.Socket) {
    const room = this.rooms.getRoom(event.roomTag);
    if (room === undefined) {
      this.sendError(ErrorType.ROOM_NOT_FOUND, socket);
      return;
    }
    const options = event.gameOptions === undefined ?
      event.gameOptions :
      { rules: room.rules, words: room.words };
    const game = this.games.createGame(room.tag, options);
    room.gameId = game.id;
    const response = {
      type: EventType.GameCreated,
      gameId: game.id,
    } as EventGameCreated;
    socket.send(response);
    this.broadcastGameState(room.gameId, room.tag);
  }

  private handleCardRevealEvent(event: EventCardReveal, socket: SocketIO.Socket) {
    const { game, room, error } = this.getGame(event as EventGame);
    if (error !== undefined) { return this.sendError(error, socket); }

    game.revealCard((event as EventCardReveal).coordinate);
    game.highlightCard();
    this.broadcastGameState(room.gameId, room.tag);
  }

  private handleCardHighlightEvent(event: EventCardHighlight, socket: SocketIO.Socket) {
    const { game, room, error } = this.getGame(event as EventGame);
    if (error !== undefined) { return this.sendError(error, socket); }

    game.highlightCard((event as EventCardHighlight).coordinate);
    this.broadcastGameState(room.gameId, room.tag);
  }

  private handleTurnEndEvent(event: EventTurnEnd, socket: SocketIO.Socket) {
    const { game, room, error } = this.getGame(event as EventGame);
    if (error !== undefined) { return this.sendError(error, socket); }

    game.endTurn();
    this.broadcastGameState(room.gameId, room.tag);
  }

  private handleEventMessageClear(event: EventMessageClear, socket: SocketIO.Socket) {
    const { game, room, error } = this.getGame(event as EventGame);
    if (error !== undefined) { return this.sendError(error, socket); }

    game.clearMessage();
    this.broadcastGameState(room.gameId, room.tag);
  }

  private getGame(event: EventGame) {
    const response: { room?: Room, game?: Game, error?: ErrorType } = {
      room: undefined,
      game: undefined,
      error: undefined,
    };
    response.room = this.rooms.getRoom(event.roomTag);
    if (response.room === undefined) {
      response.error = ErrorType.ROOM_NOT_FOUND;
      return response;
    }
    response.game = this.games.findById(event.gameId);
    if (response.game === undefined) {
      response.error = ErrorType.GAME_NOT_FOUND;
      return response;
    }
    return response;
  }

  private sendError(error: ErrorType, socket: SocketIO.Socket) {
    const event: EventError = {
      error,
      type: EventType.Error,
    };
    socket.send(event);
  }

  private broadcastGameState(id: GameID, roomTag: string) {
    const game: Game = this.games.findById(id);
    if (game === undefined) {
      return;
    }
    const response: EventGameState = {
      roomTag,
      type: EventType.GameState,
      gameId: game.id,
      state: game.state,
    };
    this.io.to(roomTag).emit('event', response);
  }
}
