import { ActionTypes, Action } from '../actions';
import { ActionLoadRoom, ActionLoadRoomSuccess } from './actions';
import { DictionaryName, RulesetName } from '../game/types';

export interface RoomState {
  id?: string;
  loading?: boolean;
  gameId?: string;
  dictionary?: DictionaryName;
  ruleset?: RulesetName;
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
    default:
      return state;
  }
};
