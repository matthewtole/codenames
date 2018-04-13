import { ActionGame } from './game/actions';
import { ActionSetup } from './setup/actions';
import { ActionRoom } from './room/actions';
import { ActionUI } from './ui/actions';

export interface BaseAction {
  type: ActionTypes;
  payload: object;
}

export enum ActionTypes {
  NONE = 'NONE',

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
  ROOM_GENERATE_CODE = 'ROOM/GENERATE_CODE',
  ROOM_GENERATE_CODE_SUCCESS = 'ROOM/GENERATE_CODE_SUCCESS',
  ROOM_CLEAR_CODE = 'ROOM/CLEAR_CODE',
  ROOM_JOIN = 'ROOM/JOIN',
  ROOM_JOIN_ERROR = 'ROOM/JOIN_ERROR',
  ROOM_CHANGE_RULESET = 'ROOM/CHANGE_RULESET',
  ROOM_CHANGE_DICTIONARY = 'ROOM/CHANGE_DICTIONARY',

  UI_SHOW_MENU = 'UI/SHOW_MENU',
  UI_HIDE_MENU = 'UI/HIDE_MENU',
  UI_ENTER_FULLSCREEN = 'UI/ENTER_FULLSCREEN',
  UI_EXIT_FULLSCREEN = 'UI/EXIT_FULLSCREEN',
  UI_SET_IS_FULLSCREEN = 'UI/SET_IS_FULLSCREEN',
}

export interface ActionNone extends BaseAction {
  type: ActionTypes.NONE;
  payload: {};
}

export type Action =
  | ActionNone
  | ActionGame
  | ActionSetup
  | ActionRoom
  | ActionUI;
