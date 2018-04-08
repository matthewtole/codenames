import {
  ActionLoadRoom,
  ActionLoadRoomSuccess,
  ActionCreateRoom,
  ActionCreateRoomSuccess,
} from './actions';
import { ActionTypes } from '../actions';

export const loadRoom = ({
  id,
}: ActionLoadRoom['payload']): ActionLoadRoom => ({
  type: ActionTypes.ROOM_LOAD,
  payload: {
    id,
  },
});

export const loadRoomSuccess = ({
  id,
  gameId,
  ruleset,
  dictionary,
}: ActionLoadRoomSuccess['payload']): ActionLoadRoomSuccess => ({
  type: ActionTypes.ROOM_LOAD_SUCCESS,
  payload: {
    id,
    gameId,
    ruleset,
    dictionary,
  },
});

export const createRoom = ({
  id,
}: ActionCreateRoom['payload']): ActionCreateRoom => ({
  type: ActionTypes.ROOM_CREATE,
  payload: {
    id,
  },
});

export const createRoomSuccess = (): ActionCreateRoomSuccess => ({
  type: ActionTypes.ROOM_CREATE_SUCCESS,
  payload: {},
});
