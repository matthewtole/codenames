import * as Immutable from 'immutable';
import { game, GameStateLoaded } from './reducers';
import {
  createGame,
  highlightCard,
  revealCard,
  endTurn,
  clearMessage,
  loadGame,
  loadGameSuccess,
} from './action_creators';
import { RulesetName, DictionaryName, Team, Role, Coordinate } from './types';
import * as GameSelectors from './selectors';
import {
  coordinateToIndex,
  indexToCoordinate,
  otherPlayer,
  teamToRole,
} from './utils';

describe('Game', () => {
  describe('Reducers', () => {
    describe('GAME_CREATE', () => {
      it('should create a new game', () => {
        let nextState = game(
          undefined,
          createGame({
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
            id: 'test-id',
          })
        );
        expect(nextState).not.toBeUndefined();
        expect(nextState.id).toBe('test-id');
        expect(nextState.loading).toBeFalsy();
        const gameState = nextState as GameStateLoaded;
        expect(gameState.cards).toHaveLength(25);
        expect(gameState.highlighted).toBeUndefined();
        expect(gameState.message).toBeUndefined();
        expect(gameState.revealedCards.count()).toEqual(0);
        expect(gameState.winner).toBeUndefined();

        const expectedTurn =
          GameSelectors.spyCountInternal(gameState, Team.RED) >
          GameSelectors.spyCountInternal(gameState, Team.BLUE)
            ? Team.RED
            : Team.BLUE;
        expect(gameState.turn).toEqual(expectedTurn);
      });
    });

    describe('GAME_HIGHLIGHT_CARD', () => {
      let initialState: GameStateLoaded;
      let nextState: GameStateLoaded;

      beforeEach(() => {
        initialState = game(
          undefined,
          createGame({
            id: 'test-id',
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
          })
        ) as GameStateLoaded;
      });

      it('should set the currently highlighted card', () => {
        nextState = game(
          initialState,
          highlightCard({ card: { col: 3, row: 1 } })
        ) as GameStateLoaded;
        expect(nextState.highlighted).toEqual({
          col: 3,
          row: 1,
        });
      });

      it('should clear the highlighted card if passed no card', () => {
        nextState = game(
          initialState,
          highlightCard({ card: null })
        ) as GameStateLoaded;
        expect(nextState.highlighted).toBeUndefined();
      });

      it('should not highlight a card if the game has been won', () => {
        nextState = game(
          { ...initialState, winner: Team.BLUE },
          highlightCard({ card: { col: 1, row: 3 } })
        ) as GameStateLoaded;
        expect(nextState.highlighted).toBeUndefined();
      });
    });

    describe('GAME_REVEAL_CARD', () => {
      let initialState: GameStateLoaded;
      let nextState: GameStateLoaded;

      beforeEach(() => {
        initialState = game(
          undefined,
          createGame({
            id: 'test-id',
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
          })
        ) as GameStateLoaded;
      });

      it('should add a new revealed card', () => {
        nextState = game(
          initialState,
          revealCard({ card: { col: 3, row: 1 } })
        ) as GameStateLoaded;
        expect(nextState.revealedCards.first()).toEqual(
          coordinateToIndex({
            col: 3,
            row: 1,
          })
        );
      });

      it('should not add the same revealed card twice', () => {
        nextState = game(
          initialState,
          revealCard({ card: { col: 3, row: 1 } })
        ) as GameStateLoaded;
        expect(nextState.revealedCards.count()).toEqual(1);
        nextState = game(
          nextState,
          revealCard({ card: { col: 3, row: 1 } })
        ) as GameStateLoaded;
        expect(nextState.revealedCards.count()).toEqual(1);
      });

      it('should not reveal a card if the game has been won', () => {
        nextState = game(
          { ...initialState, winner: Team.BLUE },
          revealCard({ card: { col: 1, row: 2 } })
        ) as GameStateLoaded;
        expect(nextState.revealedCards.isEmpty()).toBeTruthy();
      });

      it('should remove the highlight', () => {
        nextState = game(
          initialState,
          revealCard({ card: { col: 3, row: 1 } })
        ) as GameStateLoaded;
        expect(nextState.highlighted).toBeUndefined();
      });

      const getCardByRole = (
        state: GameStateLoaded,
        role: Role,
        excludeRevealed?: boolean
      ): Coordinate | undefined => {
        for (let c = 0; c < state.cards.length; c += 1) {
          const card = state.cards[c];
          if (card.role === role) {
            if (!excludeRevealed) {
              return indexToCoordinate(c);
            }
            if (!state.revealedCards.includes(c)) {
              return indexToCoordinate(c);
            }
          }
        }
        return;
      };

      it('should set the winner if the assassin is picked', () => {
        const card = getCardByRole(initialState, Role.ASSASSIN)!;
        nextState = game(initialState, revealCard({ card })) as GameStateLoaded;
        expect(GameSelectors.winner(nextState)).toEqual(
          otherPlayer(GameSelectors.turn(initialState)!)
        );
      });

      it('should change the turn if a bystander is picked', () => {
        const card = getCardByRole(initialState, Role.BYSTANDER)!;
        nextState = game(initialState, revealCard({ card })) as GameStateLoaded;
        expect(GameSelectors.turn(nextState)).toEqual(
          otherPlayer(GameSelectors.turn(initialState)!)
        );
      });

      it('should not change the turn if a friendly spy is picked', () => {
        const card = getCardByRole(
          initialState,
          teamToRole(initialState.turn)
        )!;
        nextState = game(initialState, revealCard({ card })) as GameStateLoaded;
        expect(GameSelectors.turn(nextState)).toEqual(
          GameSelectors.turn(initialState)
        );
      });

      it('should not change the turn if an enemy spy is picked', () => {
        const card = getCardByRole(
          initialState,
          teamToRole(otherPlayer(initialState.turn))
        )!;
        nextState = game(initialState, revealCard({ card })) as GameStateLoaded;
        expect(GameSelectors.turn(nextState)).toEqual(
          otherPlayer(GameSelectors.turn(initialState)!)
        );
      });

      it('should set the winner if the last friendly spy is found', () => {
        const turn = initialState.turn;
        nextState = { ...initialState };
        let card = getCardByRole(nextState, teamToRole(turn), true)!;
        expect(card).not.toBeUndefined();
        while (card) {
          nextState = game(nextState, revealCard({ card })) as GameStateLoaded;
          if (GameSelectors.spyCountInternal(nextState, turn) === 0) {
            expect(GameSelectors.winner(nextState)).toEqual(turn);
          }
          card = getCardByRole(nextState, teamToRole(turn), true)!;
        }
      });

      it('should set the winner to the other team if the last end spy is found', () => {
        const turn = otherPlayer(initialState.turn);
        nextState = { ...initialState };
        let card = getCardByRole(nextState, teamToRole(turn), true)!;
        expect(card).not.toBeUndefined();
        while (card) {
          nextState = game(nextState, revealCard({ card })) as GameStateLoaded;
          nextState = game(nextState, endTurn()) as GameStateLoaded;
          if (GameSelectors.spyCountInternal(nextState, turn) === 0) {
            expect(GameSelectors.winner(nextState)).toEqual(turn);
          }
          card = getCardByRole(nextState, teamToRole(turn), true)!;
        }
      });
    });

    describe('GAME_CLEAR_MESSAGE', () => {
      let initialState: GameStateLoaded;
      let nextState: GameStateLoaded;

      beforeEach(() => {
        initialState = game(
          undefined,
          createGame({
            id: 'test-id',
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
          })
        ) as GameStateLoaded;
      });

      it('should clear the message', () => {
        nextState = game(
          initialState,
          revealCard({ card: { row: 1, col: 2 } })
        ) as GameStateLoaded;
        expect(nextState.message).not.toBeUndefined();
        nextState = game(nextState, clearMessage()) as GameStateLoaded;
        expect(nextState.message).toBeUndefined();
      });
    });

    describe('GAME_END_TURN', () => {
      let initialState: GameStateLoaded;
      let nextState: GameStateLoaded;

      beforeEach(() => {
        initialState = game(
          undefined,
          createGame({
            id: 'test-id',
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
          })
        ) as GameStateLoaded;
      });

      it('should set the turn to the other team', () => {
        nextState = game(initialState, endTurn()) as GameStateLoaded;
        expect(nextState.turn).not.toEqual(initialState.turn);
      });

      it('should clear the highlighted card', () => {
        nextState = game(
          initialState,
          highlightCard({ card: { col: 1, row: 1 } })
        ) as GameStateLoaded;
        nextState = game(initialState, endTurn()) as GameStateLoaded;
        expect(nextState.highlighted).toBeUndefined();
      });
    });

    describe('GAME_LOAD', () => {
      it('should set the ID and loading to true', () => {
        let nextState = game(
          undefined,
          loadGame({
            id: 'test-id',
          })
        );
        expect(nextState).not.toBeUndefined();
        expect(nextState.id).toBe('test-id');
        expect(nextState.loading).toBeTruthy();
      });
    });

    describe('GAME_LOAD_SUCCESS', () => {
      it('should populate the rest of the game data', () => {
        const initialState = game(undefined, loadGame({ id: 'test-id' }));
        let nextState = game(
          initialState,
          loadGameSuccess({
            cards: [],
            revealedCards: [],
            ruleset: RulesetName.DRINKING,
            dictionary: DictionaryName.ORIGINAL,
            turn: Team.RED,
          })
        ) as GameStateLoaded;

        expect(nextState.id).toBe('test-id');
        expect(nextState.loading).toBeFalsy();
        expect(nextState.cards).toEqual([]);
        expect(nextState.revealedCards).toBeInstanceOf(Immutable.Set);
        expect(nextState.ruleset).toEqual(RulesetName.DRINKING);
        expect(nextState.dictionary).toEqual(DictionaryName.ORIGINAL);
        expect(nextState.turn).toEqual(Team.RED);
      });
    });
  });
});
