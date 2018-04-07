import { teamToRole } from '../reducers/game';
import { GameState } from '../reducers/game';
import { State } from '../reducers/index';
import { GameData, Team } from '../lib/types';

export const getGameState = (state: State) => state.game;

export const spyCount = (data: GameData, team: Team): number => {
  const { cards, revealedCards } = data;

  let count = 0;
  cards.forEach(
    (card, index) =>
      (count +=
        card.role === teamToRole(team) && !revealedCards.includes(index)
          ? 1
          : 0)
  );
  return count;
};

export const winner = (state: GameState): Team | undefined => {
  return state.data ? state.data.winner : undefined;
};

export const turn = (state: GameState): Team | undefined => {
  return state.data ? state.data.turn : undefined;
};
