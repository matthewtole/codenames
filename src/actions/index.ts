import { ActionGame } from './game';
import { ActionRoomSetup } from './room-setup';
import { ActionRoom } from './room';

export interface BaseAction {
  type: string;
  payload: object;
}

export enum ActionTypes {
  GAME_HIGHLIGHT_CARD = 'GAME/HIGHLIGHT_CARD',
  GAME_REVEAL_CARD = 'GAME/REVEAL_CARD',
  GAME_CREATE = 'GAME/CREATE',
  GAME_LOAD = 'GAME/LOAD',
  GAME_LOAD_SUCCESS = 'GAME/LOAD_SUCCESS',
  GAME_CLEAR_MESSAGE = 'GAME/CLEAR_MESSAGE',
  GAME_END_TURN = 'GAME/END_TURN',

  ROOM_SETUP_SET_RULESET = 'ROOM_SETUP_SET_RULESET',
  ROOM_SETUP_SET_WORDLIST = 'ROOM_SETUP_SET_WORDLIST',
  ROOM_SETUP_CREATE_ROOM = 'ROOM_SETUP_CREATE_ROOM',
  ROOM_SETUP_ROOM_CREATED = 'ROOM_SETUP_ROOM_CREATED',

  ROOM_LOAD = 'ROOM_LOAD',
  ROOM_LOAD_SUCCESS = 'ROOM_LOAD_SUCCESS',
}

export type Action = ActionGame | ActionRoomSetup | ActionRoom;
