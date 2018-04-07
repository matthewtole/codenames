import { ActionTypes, BaseAction } from './index';
import {
  Coordinate,
  RulesetName,
  DictionaryName,
  Card,
  Team,
  Message,
} from '../lib/types';

export interface ActionCreateGame extends BaseAction {
  type: ActionTypes.GAME_CREATE;
  payload: {
    id: string;
    ruleset: RulesetName;
    dictionary: DictionaryName;
  };
}

export interface ActionLoadGame extends BaseAction {
  type: ActionTypes.GAME_LOAD;
  payload: {
    id: string;
  };
}

export interface ActionLoadGameSuccess extends BaseAction {
  type: ActionTypes.GAME_LOAD_SUCCESS;
  payload: {
    cards: Card[];
    revealedCards: number[];
    ruleset: RulesetName;
    turn: Team;
    dictionary: DictionaryName;
    message?: Message;
    highlighted?: Coordinate;
    winner?: Team;
  };
}

export interface ActionHighlightCard extends BaseAction {
  type: ActionTypes.GAME_HIGHLIGHT_CARD;
  payload: {
    card: Coordinate | null;
  };
}

export interface ActionRevealCard extends BaseAction {
  type: ActionTypes.GAME_REVEAL_CARD;
  payload: {
    card: Coordinate;
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

// -----

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
  id,
  ruleset,
  dictionary,
}: ActionCreateGame['payload']): ActionCreateGame => ({
  type: ActionTypes.GAME_CREATE,
  payload: {
    id,
    ruleset,
    dictionary,
  },
});

export const loadGame = ({
  id,
}: ActionLoadGame['payload']): ActionLoadGame => ({
  type: ActionTypes.GAME_LOAD,
  payload: {
    id,
  },
});

export const loadGameSuccess = ({
  cards,
  revealedCards,
  ruleset,
  turn,
  dictionary,
  message,
  highlighted,
  winner,
}: ActionLoadGameSuccess['payload']): ActionLoadGameSuccess => ({
  type: ActionTypes.GAME_LOAD_SUCCESS,
  payload: {
    cards,
    revealedCards,
    ruleset,
    turn,
    dictionary,
    message,
    highlighted,
    winner,
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

export type ActionGame =
  | ActionHighlightCard
  | ActionRevealCard
  | ActionCreateGame
  | ActionLoadGame
  | ActionLoadGameSuccess
  | ActionClearMessage
  | ActionEndTurn;
