import * as assert from 'assert';
import * as shuffle from 'shuffle-array';
import { Set } from 'immutable';
import * as GameSelectors from './selectors';
import {
  Team,
  Role,
  Coordinate,
  Card,
  RulesetName,
  DictionaryName,
  MessageKey,
} from './types';
import {
  ActionHighlightCard,
  ActionCreateGame,
  ActionLoadGame,
  ActionClearMessage,
  ActionEndTurn,
  ActionRevealCard,
  ActionLoadGameSuccess,
} from './actions';
import { Action, ActionTypes } from '../actions';
import { coordinateToIndex, otherPlayer, teamToRole } from './utils';
import { DictionaryManager } from '../../lib/dictionary';

export interface GameStateLoaded {
  id: string;
  loading: false;

  cards: Card[];
  turn: Team;
  highlighted?: Coordinate;
  revealedCards: Set<number>;
  messageKey?: MessageKey;
  ruleset: RulesetName;
  dictionary: DictionaryName;
  winner?: Team;
}

export interface GameStateEmpty {
  id?: string;
  loading: boolean;
}

export type GameState = GameStateEmpty | GameStateLoaded;

function handleHighlightCard(
  state: GameStateLoaded,
  action: ActionHighlightCard
): GameState {
  if (GameSelectors.winner(state)) {
    return state;
  }

  return {
    ...state,
    highlighted: action.payload.card || undefined,
  };
}

function handleRevealAssassin(
  state: GameStateLoaded,
  action: ActionRevealCard
): GameState {
  return {
    ...state,
    messageKey: MessageKey.ASSASSIN,
    winner: otherPlayer(state.turn),
    turn: otherPlayer(state.turn),
    highlighted: undefined,
    revealedCards: state.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
}

function handleRevealBystander(
  state: GameStateLoaded,
  action: ActionRevealCard
): GameState {
  return {
    ...state,
    messageKey: MessageKey.BYSTANDER,
    turn: otherPlayer(state.turn),
    highlighted: undefined,
    revealedCards: state.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
}

function handleRevealFriendlySpy(
  state: GameStateLoaded,
  action: ActionRevealCard
): GameState {
  state = {
    ...state,
    messageKey: MessageKey.FRIENDLY_SPY,
    highlighted: undefined,
    revealedCards: state.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
  return {
    ...state,
    winner:
      GameSelectors.spyCountInternal(state, state.turn) === 0
        ? state.turn
        : undefined,
  };
}

function handleRevealEnemySpy(
  state: GameStateLoaded,
  action: ActionRevealCard
): GameState {
  state = {
    ...state,
    highlighted: undefined,
    messageKey: MessageKey.ENEMY_SPY,
    turn: otherPlayer(state.turn),
    revealedCards: state.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
  return {
    ...state,
    winner:
      GameSelectors.spyCountInternal(state, state.turn) === 0
        ? state.turn
        : undefined,
  };
}

function handleRevealCard(
  state: GameStateLoaded,
  action: ActionRevealCard
): GameState {
  if (GameSelectors.winner(state)) {
    return state;
  }

  const { card } = action.payload;
  const index = coordinateToIndex(card);

  if (state.revealedCards.includes(index)) {
    return state;
  }

  switch (state.cards[index].role) {
    case Role.ASSASSIN:
      return handleRevealAssassin(state, action);
    case Role.BYSTANDER:
      return handleRevealBystander(state, action);
    case teamToRole(state.turn):
      return handleRevealFriendlySpy(state, action);
    case teamToRole(otherPlayer(state.turn)):
      return handleRevealEnemySpy(state, action);
    /* istanbul ignore next */
    default:
      return state;
  }
}

function handleGameCreate(
  state: GameState,
  action: ActionCreateGame
): GameStateLoaded {
  const turn = Math.round(Math.random()) === 1 ? Team.RED : Team.BLUE;
  const words: string[] = randomWords(
    DictionaryManager.get(action.payload.dictionary),
    25
  );
  const roles: Role[] = randomRoles(turn);
  const cards: Card[] = roles.map((role, index) => ({
    role,
    word: words[index],
  }));

  return {
    ...state,
    id: action.payload.id,
    loading: false,
    cards,
    turn,
    ruleset: action.payload.ruleset,
    dictionary: action.payload.dictionary,
    revealedCards: Set<number>(),
    winner: undefined,
    highlighted: undefined,
  };
}

function handleLoadGame(state: GameState, action: ActionLoadGame) {
  return {
    ...state,
    id: action.payload.id,
    loading: true,
  };
}

function handleLoadGameSucceess(
  state: GameState,
  action: ActionLoadGameSuccess
): GameState {
  const {
    cards,
    turn,
    ruleset,
    dictionary,
    highlighted,
    messageKey,
    revealedCards,
    winner,
  } = action.payload;

  return {
    ...state,
    loading: false,
    cards,
    turn,
    ruleset,
    dictionary,
    messageKey: messageKey || undefined,
    highlighted: highlighted || undefined,
    revealedCards: Set<number>(revealedCards),
    winner: winner || undefined,
  };
}

function handleClearMessage(
  state: GameStateLoaded,
  action: ActionClearMessage
): GameState {
  return {
    ...state,
    messageKey: undefined,
  };
}

function handleEndTurn(
  state: GameStateLoaded,
  action: ActionEndTurn
): GameState {
  return {
    ...state,
    highlighted: undefined,
    turn: otherPlayer(state.turn),
  };
}

function randomRoles(firstPlayer: Team): Role[] {
  const roles: Role[] = [];
  for (let red = 0; red < (firstPlayer === Team.RED ? 9 : 8); red += 1) {
    roles.push(Role.RED_SPY);
  }
  for (let blue = 0; blue < (firstPlayer === Team.BLUE ? 9 : 8); blue += 1) {
    roles.push(Role.BLUE_SPY);
  }
  for (let bystander = 0; bystander < 7; bystander += 1) {
    roles.push(Role.BYSTANDER);
  }
  roles.push(Role.ASSASSIN);
  assert.equal(roles.length, 25);
  return shuffle(roles);
}

function randomWords(list: string[], count: number) {
  const words = [];
  for (let w = 0; w < Math.min(count, list.length); w += 1) {
    let word: string | undefined;
    while (word === undefined || words.indexOf(word) >= 0) {
      const index = Math.floor(Math.random() * list.length);
      word = list[index];
    }
    words.push(word);
  }
  return words;
}

export const initialState: GameState = {
  loading: false,
};

export const game = (
  state: GameState = initialState,
  action: Action
): GameState => {
  switch (action.type) {
    case ActionTypes.GAME_CREATE:
      return handleGameCreate(state, action as ActionCreateGame);
    case ActionTypes.GAME_HIGHLIGHT_CARD:
      return handleHighlightCard(
        state as GameStateLoaded,
        action as ActionHighlightCard
      );
    case ActionTypes.GAME_REVEAL_CARD:
      return handleRevealCard(
        state as GameStateLoaded,
        action as ActionRevealCard
      );
    case ActionTypes.GAME_LOAD:
      return handleLoadGame(state, action as ActionLoadGame);
    case ActionTypes.GAME_LOAD_SUCCESS:
      return handleLoadGameSucceess(state, action as ActionLoadGameSuccess);
    case ActionTypes.GAME_CLEAR_MESSAGE:
      return handleClearMessage(
        state as GameStateLoaded,
        action as ActionClearMessage
      );
    case ActionTypes.GAME_END_TURN:
      return handleEndTurn(state as GameStateLoaded, action as ActionEndTurn);
    /* istanbul ignore next */
    default:
      return state;
  }
};
