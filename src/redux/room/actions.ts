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

export type ActionRoom =
  | ActionLoadRoom
  | ActionLoadRoomSuccess
  | ActionCreateRoom
  | ActionCreateRoomSuccess;
