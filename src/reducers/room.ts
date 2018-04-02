import { Action, ActionTypes } from '../actions';

export interface RoomState {
  id?: string;
  loading?: boolean;
  gameId?: string;
  wordlist?: string;
  ruleset?: string;
}

const initialState: RoomState = {};

export const room = (
  state: RoomState = initialState,
  action: Action
): RoomState => {
  switch (action.type) {
    case ActionTypes.ROOM_LOAD:
      return {
        ...initialState,
        id: action.payload.id,
        loading: true,
      };
    case ActionTypes.ROOM_LOAD_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        gameId: action.payload.gameId,
        wordlist: action.payload.wordlist,
        ruleset: action.payload.ruleset,
        loading: false,
      };
    case ActionTypes.GAME_SET_ID:
      return {
        ...state,
        gameId: action.payload.id,
      };
    default:
      return state;
  }
};
