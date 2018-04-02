import { ActionTypes, BaseAction } from './index';

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
    gameId?: string;
    ruleset?: string;
    wordlist?: string;
  };
}

export const loadRoom = ({
  id,
}: ActionLoadRoom['payload']): ActionLoadRoom => ({
  type: ActionTypes.ROOM_LOAD,
  payload: {
    id,
  },
});

export const loadRoomSucess = ({
  id,
  gameId,
  ruleset,
  wordlist,
}: ActionLoadRoomSuccess['payload']): ActionLoadRoomSuccess => ({
  type: ActionTypes.ROOM_LOAD_SUCCESS,
  payload: {
    id,
    gameId,
    ruleset,
    wordlist,
  },
});

export type ActionRoom = ActionLoadRoom | ActionLoadRoomSuccess;
