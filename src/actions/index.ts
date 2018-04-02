import { ActionGame } from './game';
import { ActionRoomSetup } from './room-setup';
import { ActionRoom } from './room';

export interface BaseAction {
  type: string;
  payload: object;
}

export enum ActionTypes {
  GAME_HIGHLIGHT_CARD = 'GAME_HIGHLIGHT_CARD',
  GAME_REVEAL_CARD = 'GAME_REVEAL_CARD',
  GAME_CREATE = 'GAME_CREATE',
  GAME_JOIN = 'GAME_JOIN',
  GAME_LOAD = 'GAME_LOAD',
  GAME_SET_ID = 'GAME_SET_ID',
  GAME_CLEAR_MESSAGE = 'GAME_CLEAR_MESSAGE',
  GAME_END_TURN = 'GAME_END_TURN',
  GAME_SHOW_MENU = 'GAME_SHOW_MENU',
  GAME_HIDE_MENU = 'GAME_HIDE_MENU',

  ROOM_SETUP_SET_RULESET = 'ROOM_SETUP_SET_RULESET',
  ROOM_SETUP_SET_WORDLIST = 'ROOM_SETUP_SET_WORDLIST',
  ROOM_SETUP_CREATE_ROOM = 'ROOM_SETUP_CREATE_ROOM',
  ROOM_SETUP_ROOM_CREATED = 'ROOM_SETUP_ROOM_CREATED',

  ROOM_LOAD = 'ROOM_LOAD',
  ROOM_LOAD_SUCCESS = 'ROOM_LOAD_SUCCESS',
}

export type Action = ActionGame | ActionRoomSetup | ActionRoom;
