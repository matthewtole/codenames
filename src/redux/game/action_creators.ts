import {
  ActionHighlightCard,
  ActionRevealCard,
  ActionCreateGame,
  ActionLoadGame,
  ActionLoadGameSuccess,
  ActionClearMessage,
  ActionEndTurn,
} from './actions';
import { ActionTypes } from '../actions';

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
