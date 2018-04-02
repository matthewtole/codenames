import { Team, teamToRole } from '../reducers/game';
import { GameState } from '../reducers/game';
import { State } from '../reducers/index';

export const getGameState = (state: State) => state.game;

export const spyCount = (state: GameState, team: Team): number => {
  if (!state) {
    return 0;
  }
  if (!state.data) {
    return 0;
  }
  const { cards, revealedCards } = state.data;

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
