import { ActionTypes, Action } from '../actions';
import { ActionLoadRoom, ActionLoadRoomSuccess } from './actions';
import { DictionaryName, RulesetName } from '../game/types';

export interface RoomState {
  id?: string;
  loading?: boolean;
  gameId?: string;
  dictionary?: DictionaryName;
  ruleset?: RulesetName;
  code?: string;
  joinError?: string;
}

const initialState: RoomState = {};

function handleRoomLoad(state: RoomState, action: ActionLoadRoom): RoomState {
  return {
    ...initialState,
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

export const room = (
  state: RoomState = initialState,
  action: Action
): RoomState => {
  switch (action.type) {
    case ActionTypes.ROOM_LOAD:
      return handleRoomLoad(state, action as ActionLoadRoom);
    case ActionTypes.ROOM_LOAD_SUCCESS:
      return handleRoomLoadSuccess(state, action as ActionLoadRoomSuccess);
    case ActionTypes.GAME_LOAD:
      return { ...state, gameId: action.payload.id };
    case ActionTypes.ROOM_GENERATE_CODE_SUCCESS:
      return { ...state, code: action.payload.code };
    case ActionTypes.ROOM_CLEAR_CODE:
      return { ...state, code: undefined };
    case ActionTypes.ROOM_JOIN:
      return { ...state, joinError: undefined };
    case ActionTypes.ROOM_JOIN_ERROR:
      return { ...state, joinError: action.payload.error };
    default:
      return state;
  }
};
