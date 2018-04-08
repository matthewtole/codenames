import { ActionGame } from './game/actions';
import { ActionSetup } from './setup/actions';
import { ActionRoom } from './room/actions';
import { ActionUI } from './ui/actions';

export interface BaseAction {
  type: ActionTypes;
  payload: object;
}

export enum ActionTypes {
  GAME_CREATE = 'GAME/CREATE',
  GAME_LOAD = 'GAME/LOAD',
  GAME_LOAD_SUCCESS = 'GAME/LOAD_SUCCESS',
  GAME_HIGHLIGHT_CARD = 'GAME/HIGHLIGHT_CARD',
  GAME_REVEAL_CARD = 'GAME/REVEAL_CARD',
  GAME_CLEAR_MESSAGE = 'GAME/CLEAR_MESSAGE',
  GAME_END_TURN = 'GAME/END_TURN',

  SETUP_SET_RULESET = 'SETUP/SET_RULESET',
  SETUP_SET_DICTIONARY = 'SETUP/SET_DICTIONARY',

  ROOM_CREATE = 'ROOM/CREATE',
  ROOM_CREATE_SUCCESS = 'SETUP/CREATE_SUCCESS',
  ROOM_LOAD = 'ROOM/LOAD',
  ROOM_LOAD_SUCCESS = 'ROOM/LOAD_SUCCESS',

  UI_SHOW_MENU = 'UI/SHOW_MENU',
  UI_HIDE_MENU = 'UI/HIDE_MENU',
}

export type Action = ActionGame | ActionSetup | ActionRoom | ActionUI;
