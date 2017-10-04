import * as winston from 'winston';
import { Game, GameID, GameOptions, GameState, Coordinate } from './game';
import { Games } from './games';
import { Rooms, RoomOptions, RoomTag } from './rooms';

/**
 * TODO: Write creation functions for the Event types
 * TODO: Split out the incoming and outgoing Event types
 */

export enum EventType {
  Error,
  RoomCreate,
  RoomCreated,
  RoomJoin,
  RoomJoined,
  GameCreate,
  GameCreated,
  GameState,
  MessageClear,
  CardReveal,
  CardHighlight,
  TurnEnd,
}

export enum ErrorType {
  ROOM_NOT_FOUND,
  GAME_NOT_FOUND,
}

export interface BaseEvent {
  type: EventType;
}

export interface EventRoomCreate extends BaseEvent {
  options: RoomOptions;
}

export interface EventRoomCreated extends BaseEvent {
  roomTag: RoomTag;
}

export interface EventRoomJoin extends BaseEvent {
  roomTag: RoomTag;
}

export interface EventRoomJoined extends BaseEvent {
  roomTag: RoomTag;
}

export interface EventGameCreate extends BaseEvent {
  roomTag: RoomTag;
  gameOptions?: GameOptions;
}

export interface EventGameCreated extends BaseEvent {
  gameId: GameID;
}

export interface EventGame extends BaseEvent {
  gameId: GameID;
  roomTag: RoomTag;
}

export interface EventGameState extends EventGame {
  state: GameState;
}

export interface EventMessageClear extends EventGame {
}

export interface EventCardReveal extends EventGame {
  coordinate: Coordinate;
}

export interface EventCardHighlight extends EventGame {
  coordinate?: Coordinate;
}

export interface EventTurnEnd extends EventGame {
}

export interface EventError extends BaseEvent {
  error: ErrorType;
}
