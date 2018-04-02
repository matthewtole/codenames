import { ActionTypes, BaseAction } from './index';

export interface ActionSetRuleset extends BaseAction {
  type: ActionTypes.ROOM_SETUP_SET_RULESET;
  payload: {
    ruleset: string;
  };
}

export interface ActionSetWordlist extends BaseAction {
  type: ActionTypes.ROOM_SETUP_SET_WORDLIST;
  payload: {
    wordlist: string;
  };
}

export interface ActionCreateRoom extends BaseAction {
  type: ActionTypes.ROOM_SETUP_CREATE_ROOM;
  payload: {};
}

export interface ActionRoomCreated extends BaseAction {
  type: ActionTypes.ROOM_SETUP_ROOM_CREATED;
  payload: {
    id: string;
  };
}

export const setRuleset = ({
  ruleset,
}: ActionSetRuleset['payload']): ActionSetRuleset => ({
  type: ActionTypes.ROOM_SETUP_SET_RULESET,
  payload: {
    ruleset,
  },
});

export const setWordlist = ({
  wordlist,
}: ActionSetWordlist['payload']): ActionSetWordlist => ({
  type: ActionTypes.ROOM_SETUP_SET_WORDLIST,
  payload: {
    wordlist,
  },
});

export const createRoom = (): ActionCreateRoom => ({
  type: ActionTypes.ROOM_SETUP_CREATE_ROOM,
  payload: {},
});

export const roomCreated = ({ id }: ActionRoomCreated['payload']) => ({
  type: ActionTypes.ROOM_SETUP_ROOM_CREATED,
  payload: {
    id,
  },
});

export type ActionRoomSetup =
  | ActionSetRuleset
  | ActionSetWordlist
  | ActionCreateRoom
  | ActionRoomCreated;
