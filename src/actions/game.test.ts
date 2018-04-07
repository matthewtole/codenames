import {
  highlightCard,
  revealCard,
  createGame,
  ActionHighlightCard,
  ActionRevealCard,
  loadGame,
  ActionLoadGame,
  ActionCreateGame,
  clearMessage,
  ActionClearMessage,
  endTurn,
  ActionEndTurn,
  loadGameSuccess,
  ActionLoadGameSuccess,
} from './game';
import { ActionTypes } from './index';
import { RulesetName, DictionaryName, Message, Team } from '../lib/types';

describe('Actions', () => {
  describe('Game', () => {
    describe('highlightCard', () => {
      it('should return an action of type ActionHighlightCard', () => {
        const card = { row: 2, col: 4 };
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
        const card = { row: 0, col: 1 };
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
        const message: Message = {
          content: 'This is a message',
          header: 'Test Message',
          team: Team.BLUE,
        };
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
  });
});
