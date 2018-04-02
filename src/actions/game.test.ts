import { highlightCard, revealCard, createGame } from './game';
import { ActionTypes } from './index';
import { BoardMode } from '../components/game/Board';

describe('GameActions', () => {
  describe('highlightCard', () => {
    it('returns an ActionHighlightCard object', () => {
      const action = highlightCard({ card: { col: 1, row: 1 } });
      expect(action).toEqual({
        type: ActionTypes.GAME_HIGHLIGHT_CARD,
        payload: {
          card: {
            col: 1,
            row: 1,
          },
        },
      });
    });
  });

  describe('revealCard', () => {
    it('returns an ActionRevealCard object', () => {
      const action = revealCard({ card: { col: 1, row: 1 } });
      expect(action).toEqual({
        type: ActionTypes.GAME_REVEAL_CARD,
        payload: {
          card: {
            col: 1,
            row: 1,
          },
        },
      });
    });
  });

  describe('createGame', () => {
    it('returns an ActionCreateGame object', () => {
      const action = createGame({
        rules: 'standard',
        words: 'original',
        mode: BoardMode.Controller,
      });
      expect(action).toEqual({
        type: ActionTypes.GAME_CREATE,
        payload: {
          rules: 'standard',
          words: 'original',
          mode: BoardMode.Controller,
        },
      });
    });
  });
});
