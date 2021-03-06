import {
  ActionHighlightCard,
  ActionRevealCard,
  ActionCreateGame,
  ActionLoadGame,
  ActionLoadGameSuccess,
  ActionClearMessage,
  ActionEndTurn,
} from './actions';
import {
  highlightCard,
  revealCard,
  createGame,
  loadGame,
  loadGameSuccess,
  clearMessage,
  endTurn,
} from './action_creators';
import {
  DictionaryName,
  RulesetName,
  Team,
  MessageKey,
  Coordinate,
} from './types';
import { ActionTypes } from '../actions';

describe('Game', () => {
  describe('ActionCreators', () => {
    describe('highlightCard', () => {
      it('should return an action of type ActionHighlightCard', () => {
        const card: Coordinate = { row: 2, col: 4 };
        const action = highlightCard({ card });
        const expectedAction: ActionHighlightCard = {
          type: ActionTypes.GAME_HIGHLIGHT_CARD,
          payload: {
            card,
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('revealCard', () => {
      it('should return an action of type ActionRevealCard', () => {
        const card: Coordinate = { row: 0, col: 1 };
        const action = revealCard({ card });
        const expectedAction: ActionRevealCard = {
          type: ActionTypes.GAME_REVEAL_CARD,
          payload: {
            card,
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('createGame', () => {
      it('should return an action of type ActionCreateGame', () => {
        const dictionary = DictionaryName.ORIGINAL;
        const ruleset = RulesetName.STANDARD;
        const id = 'random-id';
        const action = createGame({
          dictionary,
          ruleset,
          id,
        });
        const expectedAction: ActionCreateGame = {
          type: ActionTypes.GAME_CREATE,
          payload: {
            dictionary,
            ruleset,
            id,
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('loadGame', () => {
      it('should return an action of type ActionLoadGame', () => {
        const id = 'random-id';
        const action = loadGame({ id });
        const expectedAction: ActionLoadGame = {
          type: ActionTypes.GAME_LOAD,
          payload: {
            id,
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('loadGameSuccess', () => {
      it('should return an action of type ActionLoadGame', () => {
        const dictionary = DictionaryName.ORIGINAL;
        const ruleset = RulesetName.DRINKING;
        const message = { key: MessageKey.ENEMY_SPY, team: Team.BLUE };
        const turn = Team.RED;

        const action = loadGameSuccess({
          dictionary,
          ruleset,
          message,
          turn,
          cards: [],
          revealedCards: [],
        });
        const expectedAction: ActionLoadGameSuccess = {
          type: ActionTypes.GAME_LOAD_SUCCESS,
          payload: {
            dictionary,
            ruleset,
            message,
            turn,
            cards: [],
            revealedCards: [],
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('clearMessage', () => {
      it('should return an action of type ActionClearMessage', () => {
        const action = clearMessage();
        const expectedAction: ActionClearMessage = {
          type: ActionTypes.GAME_CLEAR_MESSAGE,
          payload: {},
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('endTurn', () => {
      it('should return an action of type ActionEndTurn', () => {
        const action = endTurn();
        const expectedAction: ActionEndTurn = {
          type: ActionTypes.GAME_END_TURN,
          payload: {},
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('loadGame', () => {
      it('should return an action of type ActionLoadGame', () => {
        const action = loadGame({ id: 'test-id' });
        const expectedAction: ActionLoadGame = {
          type: ActionTypes.GAME_LOAD,
          payload: { id: 'test-id' },
        };
        expect(action).toEqual(expectedAction);
      });
    });

    describe('loadGameSuccess', () => {
      it('should return an action of type ActionLoadGameSuccess', () => {
        const action = loadGameSuccess({
          dictionary: DictionaryName.ORIGINAL,
          ruleset: RulesetName.STANDARD,
          cards: [],
          revealedCards: [],
          turn: Team.RED,
        });
        const expectedAction: ActionLoadGameSuccess = {
          type: ActionTypes.GAME_LOAD_SUCCESS,
          payload: {
            dictionary: DictionaryName.ORIGINAL,
            ruleset: RulesetName.STANDARD,
            cards: [],
            revealedCards: [],
            turn: Team.RED,
          },
        };
        expect(action).toEqual(expectedAction);
      });
    });
  });
});
