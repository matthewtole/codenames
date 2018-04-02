import { ActionTypes, BaseAction } from './index';
import { Coordinate } from '../reducers/game';
import { FirebaseGame } from '../lib/firebase';
import { BoardMode } from '../components/game/Board';

export interface ActionCreateGame extends BaseAction {
  type: ActionTypes.GAME_CREATE;
  payload: {
    rules: string;
    words: string;
    mode: BoardMode;
  };
}

export interface ActionJoinGame extends BaseAction {
  type: ActionTypes.GAME_JOIN;
  payload: {
    id: string;
    mode: BoardMode;
  };
}

export interface ActionHighlightCard extends BaseAction {
  type: ActionTypes.GAME_HIGHLIGHT_CARD;
  payload: {
    card?: Coordinate;
  };
}

export interface ActionSetGameId extends BaseAction {
  type: ActionTypes.GAME_SET_ID;
  payload: {
    id: string;
  };
}

export interface ActionRevealCard extends BaseAction {
  type: ActionTypes.GAME_REVEAL_CARD;
  payload: {
    card: Coordinate;
  };
}

export interface ActionLoadGame extends BaseAction {
  type: ActionTypes.GAME_LOAD;
  payload: {
    data: FirebaseGame;
  };
}

export interface ActionClearMessage extends BaseAction {
  type: ActionTypes.GAME_CLEAR_MESSAGE;
  payload: {};
}

export interface ActionEndTurn extends BaseAction {
  type: ActionTypes.GAME_END_TURN;
  payload: {};
}

export interface ActionShowMenu extends BaseAction {
  type: ActionTypes.GAME_SHOW_MENU;
  payload: {};
}

export interface ActionHideMenu extends BaseAction {
  type: ActionTypes.GAME_HIDE_MENU;
  payload: {};
}

export const highlightCard = ({
  card,
}: ActionHighlightCard['payload']): ActionHighlightCard => ({
  type: ActionTypes.GAME_HIGHLIGHT_CARD,
  payload: {
    card,
  },
});

export const revealCard = ({
  card,
}: ActionRevealCard['payload']): ActionRevealCard => ({
  type: ActionTypes.GAME_REVEAL_CARD,
  payload: {
    card,
  },
});

export const createGame = ({
  rules,
  words,
  mode,
}: ActionCreateGame['payload']): ActionCreateGame => ({
  type: ActionTypes.GAME_CREATE,
  payload: {
    rules,
    words,
    mode,
  },
});

export const joinGame = ({
  id,
  mode,
}: ActionJoinGame['payload']): ActionJoinGame => ({
  type: ActionTypes.GAME_JOIN,
  payload: {
    id,
    mode,
  },
});

export const setGameId = ({
  id,
}: ActionSetGameId['payload']): ActionSetGameId => ({
  type: ActionTypes.GAME_SET_ID,
  payload: {
    id,
  },
});

export const loadGame = ({
  data,
}: ActionLoadGame['payload']): ActionLoadGame => ({
  type: ActionTypes.GAME_LOAD,
  payload: {
    data,
  },
});

export const clearMessage = (): ActionClearMessage => ({
  type: ActionTypes.GAME_CLEAR_MESSAGE,
  payload: {},
});

export const endTurn = (): ActionEndTurn => ({
  type: ActionTypes.GAME_END_TURN,
  payload: {},
});

export const showMenu = (): ActionShowMenu => ({
  type: ActionTypes.GAME_SHOW_MENU,
  payload: {},
});

export const hideMenu = (): ActionHideMenu => ({
  type: ActionTypes.GAME_HIDE_MENU,
  payload: {},
});

export type ActionGame =
  | ActionHighlightCard
  | ActionRevealCard
  | ActionCreateGame
  | ActionJoinGame
  | ActionLoadGame
  | ActionSetGameId
  | ActionClearMessage
  | ActionEndTurn
  | ActionShowMenu
  | ActionHideMenu;
