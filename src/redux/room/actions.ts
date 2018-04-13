/* istanbul ignore file */

import { BaseAction, ActionTypes } from '../actions';
import { DictionaryName, RulesetName } from '../game/types';

export interface ActionLoadRoom extends BaseAction {
  type: ActionTypes.ROOM_LOAD;
  payload: {
    id: string;
  };
}

export interface ActionLoadRoomSuccess extends BaseAction {
  type: ActionTypes.ROOM_LOAD_SUCCESS;
  payload: {
    id: string;
    gameId: string;
    ruleset: RulesetName;
    dictionary: DictionaryName;
  };
}

export interface ActionCreateRoom extends BaseAction {
  type: ActionTypes.ROOM_CREATE;
  payload: {
    id: string;
  };
}

export interface ActionCreateRoomSuccess extends BaseAction {
  type: ActionTypes.ROOM_CREATE_SUCCESS;
  payload: {};
}

export interface ActionGenerateCode extends BaseAction {
  type: ActionTypes.ROOM_GENERATE_CODE;
  payload: {};
}

export interface ActionGenerateCodeSuccess extends BaseAction {
  type: ActionTypes.ROOM_GENERATE_CODE_SUCCESS;
  payload: {
    code: string;
    timeout: Date;
  };
}

export interface ActionClearCode extends BaseAction {
  type: ActionTypes.ROOM_CLEAR_CODE;
  payload: {};
}

export interface ActionJoinRoom extends BaseAction {
  type: ActionTypes.ROOM_JOIN;
  payload: {
    code: string;
  };
}

export interface ActionJoinRoomError extends BaseAction {
  type: ActionTypes.ROOM_JOIN_ERROR;
  payload: {
    code: string;
    error: string;
  };
}

export interface ActionChangeRuleset extends BaseAction {
  type: ActionTypes.ROOM_CHANGE_RULESET;
  payload: {
    ruleset: RulesetName;
  };
}

export interface ActionChangeDictionary extends BaseAction {
  type: ActionTypes.ROOM_CHANGE_DICTIONARY;
  payload: {
    dictionary: DictionaryName;
  };
}

export type ActionRoom =
  | ActionLoadRoom
  | ActionLoadRoomSuccess
  | ActionCreateRoom
  | ActionCreateRoomSuccess
  | ActionGenerateCode
  | ActionGenerateCodeSuccess
  | ActionClearCode
  | ActionJoinRoom
  | ActionJoinRoomError
  | ActionChangeDictionary
  | ActionChangeRuleset;
