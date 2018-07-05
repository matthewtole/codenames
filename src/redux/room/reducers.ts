import { ActionTypes, Action } from '../actions';
import {
  ActionLoadRoom,
  ActionLoadRoomSuccess,
  ActionLoadRoomError,
  ActionGenerateCodeSuccess,
  ActionClearCode,
  ActionJoinRoom,
  ActionJoinRoomError,
} from './actions';
import { DictionaryName, RulesetName } from '../game/types';
import { ActionLoadGame } from '../game/actions';

export interface RoomState {
  id?: string;
  loading?: boolean;
  gameId?: string;
  dictionary?: DictionaryName;
  ruleset?: RulesetName;
  code?: string;
  error?: string;
}

const initialState: RoomState = {};

function handleRoomLoad(state: RoomState, action: ActionLoadRoom): RoomState {
  return {
    id: action.payload.id,
    loading: true,
  };
}

function handleRoomLoadSuccess(
  state: RoomState,
  action: ActionLoadRoomSuccess
): RoomState {
  return {
    ...state,
    id: action.payload.id,
    gameId: action.payload.gameId,
    dictionary: action.payload.dictionary,
    ruleset: action.payload.ruleset,
    loading: false,
  };
}

function handleGameLoad(state: RoomState, action: ActionLoadGame) {
  return { ...state, gameId: action.payload.id, error: undefined };
}

function handleRoomLoadError(state: RoomState, action: ActionLoadRoomError) {
  return { ...state, error: action.payload.error, loading: false };
}

function handleGenerateCodeSuccess(
  state: RoomState,
  action: ActionGenerateCodeSuccess
) {
  return { ...state, code: action.payload.code };
}

function handleClearCode(state: RoomState, action: ActionClearCode) {
  return { ...state, code: undefined };
}

function handleRoomJoin(state: RoomState, action: ActionJoinRoom) {
  return { ...state, error: undefined };
}

function handleRoomJoinError(state: RoomState, action: ActionJoinRoomError) {
  return { ...state, error: action.payload.error };
}

export const room = (
  state: RoomState = initialState,
  action: Action
): RoomState => {
  switch (action.type) {
    case ActionTypes.ROOM_LOAD:
      return handleRoomLoad(state, action);
    case ActionTypes.ROOM_LOAD_SUCCESS:
      return handleRoomLoadSuccess(state, action);
    case ActionTypes.GAME_LOAD:
      return handleGameLoad(state, action);
    case ActionTypes.ROOM_LOAD_ERROR:
      return handleRoomLoadError(state, action);
    case ActionTypes.ROOM_GENERATE_CODE_SUCCESS:
      return handleGenerateCodeSuccess(state, action);
    case ActionTypes.ROOM_CLEAR_CODE:
      return handleClearCode(state, action);
    case ActionTypes.ROOM_JOIN:
      return handleRoomJoin(state, action);
    case ActionTypes.ROOM_JOIN_ERROR:
      return handleRoomJoinError(state, action);

    /* istanbul ignore next */
    default:
      return state;
  }
};
