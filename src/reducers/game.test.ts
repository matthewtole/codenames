import {
  GameState,
  game,
  coordinateToIndex,
  indexToCoordinate,
  otherPlayer,
  teamToRole,
} from './game';
import {
  createGame,
  highlightCard,
  revealCard,
  setGameId,
  joinGame,
  endTurn,
  clearMessage,
} from '../actions/game';
import { BoardMode } from '../components/game/Board';
import * as GameSelectors from '../selectors/game';
import { Team, Role, Coordinate } from '../lib/types';

describe('Game Reducers', () => {
  describe('GAME_CREATE', () => {
    it('should create a new game', () => {
      const nextState = game(
        undefined,
        createGame({
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );

      expect(nextState.data).not.toBeUndefined();
      expect(nextState.data!.cards).toHaveLength(25);
      expect(nextState.data!.highlighted).toBeUndefined();
      expect(nextState.data!.message).toBeUndefined();
      expect(nextState.data!.revealedCards.count()).toEqual(0);
      expect(nextState.data!.winner).toBeUndefined();
      const expectedTurn =
        GameSelectors.spyCount(nextState.data, Team.RED) >
        GameSelectors.spyCount(nextState.data, Team.BLUE)
          ? Team.RED
          : Team.BLUE;
      expect(nextState.data!.turn).toEqual(expectedTurn);
    });
  });

  describe('GAME_HIGHLIGHT_CARD', () => {
    let initialState: GameState;
    let nextState: GameState;

    beforeEach(() => {
      initialState = game(
        undefined,
        createGame({
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );
    });

    it('should set the currently highlighted card', () => {
      nextState = game(
        initialState,
        highlightCard({ card: { col: 3, row: 1 } })
      );
      expect(nextState.data!.highlighted).toEqual({
        col: 3,
        row: 1,
      });
    });

    it('should clear the highlighted card if passed no card', () => {
      nextState = game(initialState, highlightCard({}));
      expect(nextState.data!.highlighted).toBeUndefined();
    });

    it('should not highlight a card if the game has been won', () => {
      nextState = { ...initialState };
      nextState.data!.winner = Team.BLUE;
      nextState = game(nextState, highlightCard({ card: { col: 1, row: 3 } }));
      expect(nextState.data!.highlighted).toBeUndefined();
    });
  });

  describe('GAME_REVEAL_CARD', () => {
    let initialState: GameState;
    let nextState: GameState;

    beforeEach(() => {
      initialState = game(
        undefined,
        createGame({
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );
    });

    it('should add a new revealed card', () => {
      nextState = game(initialState, revealCard({ card: { col: 3, row: 1 } }));
      expect(nextState.data!.revealedCards.first()).toEqual(
        coordinateToIndex({
          col: 3,
          row: 1,
        })
      );
    });

    it('should not add the same revealed card twice', () => {
      nextState = game(initialState, revealCard({ card: { col: 3, row: 1 } }));
      expect(nextState.data!.revealedCards.count()).toEqual(1);
      nextState = game(nextState, revealCard({ card: { col: 3, row: 1 } }));
      expect(nextState.data!.revealedCards.count()).toEqual(1);
    });

    it('should not reveal a card if the game has been won', () => {
      nextState = { ...initialState };
      nextState.data!.winner = Team.BLUE;
      nextState = game(nextState, revealCard({ card: { col: 1, row: 2 } }));
      expect(nextState.data!.revealedCards.isEmpty()).toBeTruthy();
    });

    it('should remove the highlight', () => {
      nextState = game(initialState, revealCard({ card: { col: 3, row: 1 } }));
      expect(nextState.data!.highlighted).toBeUndefined();
    });

    const getCardByRole = (
      state: GameState,
      role: Role,
      excludeRevealed?: boolean
    ): Coordinate | undefined => {
      for (let c = 0; c < state.data!.cards.length; c += 1) {
        const card = state.data!.cards[c];
        if (card.role === role) {
          if (!excludeRevealed) {
            return indexToCoordinate(c);
          }
          if (!state.data!.revealedCards.includes(c)) {
            return indexToCoordinate(c);
          }
        }
      }
      return;
    };

    it('should set the winner if the assassin is picked', () => {
      const card = getCardByRole(initialState, Role.ASSASSIN)!;
      nextState = game(initialState, revealCard({ card }));
      expect(GameSelectors.winner(nextState)).toEqual(
        otherPlayer(GameSelectors.turn(initialState)!)
      );
    });

    it('should change the turn if a bystander is picked', () => {
      const card = getCardByRole(initialState, Role.BYSTANDER)!;
      nextState = game(initialState, revealCard({ card }));
      expect(GameSelectors.turn(nextState)).toEqual(
        otherPlayer(GameSelectors.turn(initialState)!)
      );
    });

    it('should not change the turn if a friendly spy is picked', () => {
      const card = getCardByRole(
        initialState,
        teamToRole(initialState.data!.turn)
      )!;
      nextState = game(initialState, revealCard({ card }));
      expect(GameSelectors.turn(nextState)).toEqual(
        GameSelectors.turn(initialState)
      );
    });

    it('should not change the turn if an enemy spy is picked', () => {
      const card = getCardByRole(
        initialState,
        teamToRole(otherPlayer(initialState.data!.turn))
      )!;
      nextState = game(initialState, revealCard({ card }));
      expect(GameSelectors.turn(nextState)).toEqual(
        otherPlayer(GameSelectors.turn(initialState)!)
      );
    });

    it('should set the winner if the last friendly spy is found', () => {
      const turn = initialState.data!.turn;
      nextState = { ...initialState };
      let card = getCardByRole(nextState, teamToRole(turn), true)!;
      expect(card).not.toBeUndefined();
      while (card) {
        nextState = game(nextState, revealCard({ card }));
        if (GameSelectors.spyCount(nextState.data!, turn) === 0) {
          expect(GameSelectors.winner(nextState)).toEqual(turn);
        }
        card = getCardByRole(nextState, teamToRole(turn), true)!;
      }
    });

    it('should set the winner to the other team if the last end spy is found', () => {
      const turn = otherPlayer(initialState.data!.turn);
      nextState = { ...initialState };
      let card = getCardByRole(nextState, teamToRole(turn), true)!;
      expect(card).not.toBeUndefined();
      while (card) {
        nextState = game(nextState, revealCard({ card }));
        nextState = game(nextState, endTurn());
        if (GameSelectors.spyCount(nextState.data!, turn) === 0) {
          expect(GameSelectors.winner(nextState)).toEqual(turn);
        }
        card = getCardByRole(nextState, teamToRole(turn), true)!;
      }
    });
  });

  describe('GAME_SET_ID', () => {
    it('should set the ID on the state', () => {
      const nextState = game(undefined, setGameId({ id: '12345' }));
      expect(nextState.id).toEqual('12345');
    });
  });

  describe('GAME_JOIN', () => {
    it('should start the loading process', () => {
      const nextState = game(
        undefined,
        joinGame({ id: '12345', mode: BoardMode.Controller })
      );
      expect(nextState).toEqual(
        jasmine.objectContaining({
          id: '12345',
          loading: true,
        })
      );
    });
  });

  describe('GAME_CLEAR_MESSAGE', () => {
    let initialState: GameState;
    let nextState: GameState;

    beforeEach(() => {
      initialState = game(
        undefined,
        createGame({
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );
    });

    it('should clear the message', () => {
      nextState = game(initialState, revealCard({ card: { row: 1, col: 2 } }));
      expect(nextState.data!.message).not.toBeUndefined();
      nextState = game(nextState, clearMessage());
      expect(nextState.data!.message).toBeUndefined();
    });
  });

  describe('GAME_END_TURN', () => {
    let initialState: GameState;
    let nextState: GameState;

    beforeEach(() => {
      initialState = game(
        undefined,
        createGame({
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );
    });

    it('should set the turn to the other team', () => {
      nextState = game(initialState, endTurn());
      expect(nextState.data!.turn).not.toEqual(initialState.data!.turn);
    });

    it('should clear the highlighted card', () => {
      nextState = game(
        initialState,
        highlightCard({ card: { col: 1, row: 1 } })
      );
      nextState = game(initialState, endTurn());
      expect(nextState.data!.highlighted).toBeUndefined();
    });
  });
});
