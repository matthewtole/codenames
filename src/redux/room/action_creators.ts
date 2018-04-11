import {
  ActionLoadRoom,
  ActionLoadRoomSuccess,
  ActionCreateRoom,
  ActionCreateRoomSuccess,
  ActionGenerateCode,
  ActionGenerateCodeSuccess,
  ActionClearCode,
  ActionJoinRoom,
  ActionJoinRoomError,
  ActionChangeRuleset,
  ActionChangeDictionary,
  ActionLoadRoomError,
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

export const loadRoomError = ({
  error,
}: ActionLoadRoomError['payload']): ActionLoadRoomError => ({
  type: ActionTypes.ROOM_LOAD_ERROR,
  payload: {
    error,
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

export const generateCode = (): ActionGenerateCode => ({
  type: ActionTypes.ROOM_GENERATE_CODE,
  payload: {},
});

export const generateCodeSuccess = ({
  code,
  timeout,
}: ActionGenerateCodeSuccess['payload']): ActionGenerateCodeSuccess => ({
  type: ActionTypes.ROOM_GENERATE_CODE_SUCCESS,
  payload: {
    code,
    timeout,
  },
});

export const clearCode = (): ActionClearCode => ({
  type: ActionTypes.ROOM_CLEAR_CODE,
  payload: {},
});

export const joinRoom = ({
  code,
}: ActionJoinRoom['payload']): ActionJoinRoom => ({
  type: ActionTypes.ROOM_JOIN,
  payload: {
    code,
  },
});

export const joinRoomError = ({
  code,
  error,
}: ActionJoinRoomError['payload']): ActionJoinRoomError => ({
  type: ActionTypes.ROOM_JOIN_ERROR,
  payload: {
    code,
    error,
  },
});

export const changeRuleset = ({
  ruleset,
}: ActionChangeRuleset['payload']): ActionChangeRuleset => ({
  type: ActionTypes.ROOM_CHANGE_RULESET,
  payload: {
    ruleset,
  },
});

export const changeDictionary = ({
  dictionary,
}: ActionChangeDictionary['payload']): ActionChangeDictionary => ({
  type: ActionTypes.ROOM_CHANGE_DICTIONARY,
  payload: {
    dictionary,
  },
});
