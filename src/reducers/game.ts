import { Action, ActionTypes } from '../actions/index';
import {
  ActionHighlightCard,
  ActionCreateGame,
  ActionRevealCard,
  ActionLoadGame,
} from '../actions/game';
import { randomWords, WORD_LISTS } from '../data/words';
import * as assert from 'assert';
import * as shuffle from 'shuffle-array';
import { Set } from 'immutable';
import { MESSAGES } from '../data/messages';
import { RULE_SETS } from '../data/rules';
import * as GameSelectors from '../selectors/game';
import { BoardMode } from '../components/game/Board';

export interface Coordinate {
  row: number;
  col: number;
}

export interface GameOptions {
  rules: string;
  words: string;
}

export enum Role {
  RED_SPY = 'RED_SPY',
  BLUE_SPY = 'BLUE_SPY',
  BYSTANDER = 'BYSTANDER',
  ASSASSIN = 'ASSASSIN',
}

export interface Card {
  word: string;
  role: Role;
}

export enum Team {
  RED = 'RED',
  BLUE = 'BLUE',
}

export interface Message {
  header: string;
  content: string;
  team: Team;
}

export interface GameData {
  cards: Card[];
  turn: Team;
  highlighted?: Coordinate;
  revealedCards: Set<number>;
  message?: Message;
  ruleset: string;
  wordlist: string;
  winner?: Team;
}

export interface GameState {
  data?: GameData;
  loading: boolean;
  id?: string;
  mode: BoardMode;
  isMenuShown: boolean;
}

export const otherPlayer = (color: Team): Team => {
  if (color === Team.RED) {
    return Team.BLUE;
  }
  return Team.RED;
};

export const teamToRole = (team: Team): Role => {
  switch (team) {
    case Team.RED:
      return Role.RED_SPY;
    case Team.BLUE:
      return Role.BLUE_SPY;
    default:
      throw new Error();
  }
};

export const roleToTeam = (role: Role): Team => {
  switch (role) {
    case Role.RED_SPY:
      return Team.RED;
    case Role.BLUE_SPY:
      return Team.BLUE;
    default:
      throw new Error();
  }
};

export const initialState = {
  loading: false,
  mode: BoardMode.Controller,
  isMenuShown: false,
};

function handleHighlightCard(
  state: GameState,
  action: ActionHighlightCard
): GameState {
  if (!state.data) {
    return state;
  }
  if (GameSelectors.winner(state)) {
    return state;
  }
  return {
    ...state,
    data: {
      ...state.data,
      highlighted: action.payload.card,
    },
  };
}

export const coordinateToIndex = (coordinate: Coordinate): number => {
  return coordinate.row * 5 + coordinate.col;
};

export const indexToCoordinate = (index: number): Coordinate => {
  const col = index % 5;
  const row = (index - col) / 5;
  return { col, row };
};

function handleRevealAssassin(
  data: GameData,
  action: ActionRevealCard
): GameData {
  return {
    ...data,
    message: setMessage(data, 'ASSASSIN'),
    winner: otherPlayer(data.turn),
    turn: otherPlayer(data.turn),
    highlighted: undefined,
    revealedCards: data.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
}

function handleRevealBystander(data: GameData, action: ActionRevealCard) {
  return {
    ...data,
    message: setMessage(data, 'BYSTANDER'),
    turn: otherPlayer(data.turn),
    highlighted: undefined,
    revealedCards: data.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
}

function handleRevealFriendlySpy(data: GameData, action: ActionRevealCard) {
  data = {
    ...data,
    message: setMessage(data, 'FRIENDLY_SPY'),
    highlighted: undefined,
    revealedCards: data.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
  return {
    ...data,
    winner:
      GameSelectors.spyCount(
        {
          loading: false,
          mode: BoardMode.Controller,
          data,
          isMenuShown: false,
        },
        data.turn
      ) === 0
        ? data.turn
        : undefined,
  };
}

function handleRevealEnemySpy(data: GameData, action: ActionRevealCard) {
  data = {
    ...data,
    highlighted: undefined,
    message: setMessage(data, 'ENEMY_SPY'),
    turn: otherPlayer(data.turn),
    revealedCards: data.revealedCards.add(
      coordinateToIndex(action.payload.card)
    ),
  };
  return {
    ...data,
    winner:
      GameSelectors.spyCount(
        {
          loading: false,
          mode: BoardMode.Controller,
          data,
          isMenuShown: false,
        },
        data.turn
      ) === 0
        ? data.turn
        : undefined,
  };
}

function handleRevealCard(
  state: GameState,
  action: ActionRevealCard
): GameState {
  if (!state.data) {
    return state;
  }

  if (GameSelectors.winner(state)) {
    return state;
  }

  const { card } = action.payload;
  const index = coordinateToIndex(card);
  if (index < 0 || index >= state.data.cards.length) {
    return state;
  }

  if (state.data.revealedCards.includes(index)) {
    return state;
  }

  let data = state.data;

  switch (state.data.cards[index].role) {
    case Role.ASSASSIN:
      data = handleRevealAssassin(data, action);
      break;
    case Role.BYSTANDER:
      data = handleRevealBystander(data, action);
      break;
    case teamToRole(state.data.turn):
      data = handleRevealFriendlySpy(data, action);
      break;
    case teamToRole(otherPlayer(state.data.turn)):
      data = handleRevealEnemySpy(data, action);
      break;
    default:
    // DO NOTHING
  }

  return {
    ...state,
    data,
  };
}

function setMessage(data: GameData, key: string): Message {
  return {
    header: formatMessage(data, MESSAGES[key]),
    content: formatMessage(data, RULE_SETS[data.ruleset][key]),
    team: data.turn,
  };
}

function formatMessage(data: GameData, message: string) {
  return message
    .replace(
      '{% other_team %}',
      otherPlayer(data.turn)
        .toString()
        .toLocaleLowerCase()
    )
    .replace('{% team %}', data.turn.toString().toLocaleLowerCase());
}

function handleGameCreate(
  state: GameState,
  action: ActionCreateGame
): GameState {
  const turn = Math.round(Math.random()) === 1 ? Team.RED : Team.BLUE;
  const words: string[] = randomWords(WORD_LISTS[action.payload.words], 25);
  const roles: Role[] = randomRoles(turn);
  const cards: Card[] = roles.map((role, index) => ({
    role,
    word: words[index],
  }));

  return {
    ...state,
    mode: action.payload.mode,
    loading: false,
    data: {
      cards,
      turn,
      ruleset: action.payload.rules,
      wordlist: action.payload.words,
      revealedCards: Set<number>(),
      winner: undefined,
      highlighted: undefined,
    },
  };
}

function handleLoadGame(state: GameState, action: ActionLoadGame): GameState {
  const {
    cards,
    turn,
    ruleset,
    wordlist,
    highlighted,
    message,
    revealedCards,
    winner,
  } = action.payload.data;
  return {
    ...state,
    loading: false,
    data: {
      cards,
      turn,
      ruleset,
      wordlist,
      message: message || undefined,
      highlighted: highlighted || undefined,
      revealedCards: Set<number>(revealedCards),
      winner: winner || undefined,
    },
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

export const game = (
  state: GameState = initialState,
  action: Action
): GameState => {
  switch (action.type) {
    case ActionTypes.GAME_CREATE:
      return handleGameCreate(state, action as ActionCreateGame);
    case ActionTypes.GAME_HIGHLIGHT_CARD:
      return handleHighlightCard(state, action as ActionHighlightCard);
    case ActionTypes.GAME_REVEAL_CARD:
      return handleRevealCard(state, action as ActionRevealCard);
    case ActionTypes.GAME_SET_ID:
      return { ...state, id: action.payload.id };
    case ActionTypes.GAME_JOIN:
      return {
        ...state,
        id: action.payload.id,
        mode: action.payload.mode,
        loading: true,
      };
    case ActionTypes.GAME_LOAD:
      return handleLoadGame(state, action as ActionLoadGame);
    case ActionTypes.GAME_CLEAR_MESSAGE:
      return {
        ...state,
        data: {
          ...state.data!,
          message: undefined,
        },
      };
    case ActionTypes.GAME_END_TURN:
      return {
        ...state,
        data: {
          ...state.data!,
          highlighted: undefined,
          turn: otherPlayer(state.data!.turn),
        },
      };
    case ActionTypes.GAME_SHOW_MENU:
      return {
        ...state,
        isMenuShown: true,
      };
    case ActionTypes.GAME_HIDE_MENU:
      return {
        ...state,
        isMenuShown: false,
      };
    default:
      return state;
  }
};
