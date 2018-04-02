import { Action, ActionTypes } from '../actions/index';

export interface RoomSetupState {
  wordlist: string;
  ruleset: string;
  creatingRoom?: boolean;
  roomId?: string;
}

const initialState: RoomSetupState = {
  wordlist: 'original',
  ruleset: 'standard',
};

export const roomSetup = (
  state: RoomSetupState = initialState,
  action: Action
): RoomSetupState => {
  switch (action.type) {
    case ActionTypes.ROOM_SETUP_SET_WORDLIST:
      return {
        ...state,
        wordlist: action.payload.wordlist,
      };
    case ActionTypes.ROOM_SETUP_SET_RULESET:
      return {
        ...state,
        ruleset: action.payload.ruleset,
      };
    case ActionTypes.ROOM_SETUP_CREATE_ROOM:
      return {
        ...state,
        creatingRoom: true,
      };
    case ActionTypes.ROOM_SETUP_ROOM_CREATED:
      return {
        ...state,
        creatingRoom: false,
        roomId: action.payload.id,
      };
    default:
      return state;
  }
};
