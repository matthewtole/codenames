'use strict';

const Game = require('../../lib/game');

describe('Game', () => {
  describe('#state', () => {
    it('should return the current state of the game', () => {
      const game = new Game('original');
      expect(typeof game.state).toBe('object');
    });
  });
});
