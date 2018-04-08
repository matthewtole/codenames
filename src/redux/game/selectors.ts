import * as Immutable from 'immutable';
import { Team, Card } from './types';
import { GameState, GameStateLoaded } from './reducers';
import { teamToRole } from './utils';
import { State } from '../store';

const getLoadedGameState = (state: State): GameStateLoaded => {
  return state.game as GameStateLoaded;
};

export const cards = (state: State): Card[] => {
  return getLoadedGameState(state).cards;
};

export const revealedCards = (state: State): Immutable.Set<number> => {
  return getLoadedGameState(state).revealedCards;
};

export const spyCountInternal = (
  state: GameStateLoaded,
  team: Team
): number => {
  let count = 0;
  state.cards.forEach(
    (card: Card, index: number) =>
      (count +=
        card.role === teamToRole(team) && !state.revealedCards.includes(index)
          ? 1
          : 0)
  );
  return count;
};

export const isLoaded = (state: State): boolean => {
  return state.game && !!state.game.id && !state.game.loading;
};

export const spyCount = (state: State, team: Team): number => {
  if (!isLoaded(state)) {
    return 0;
  }
  return spyCountInternal(getLoadedGameState(state), team);
};

export const winner = (state: GameState): Team | undefined => {
  return (state as GameStateLoaded).winner;
};

export const turn = (state: GameState): Team | undefined => {
  return (state as GameStateLoaded).turn;
};
