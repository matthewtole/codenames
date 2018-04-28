/* istanbul ignore file */

import { BaseAction, ActionTypes } from '../actions';
import {
  RulesetName,
  DictionaryName,
  Team,
  Coordinate,
  Message,
} from './types';
import { Card } from '../../components/game/Card';

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

export type ActionGame =
  | ActionHighlightCard
  | ActionRevealCard
  | ActionCreateGame
  | ActionLoadGame
  | ActionLoadGameSuccess
  | ActionClearMessage
  | ActionEndTurn;
