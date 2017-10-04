import { Games } from './games';

describe('Games', () => {
  describe('#createGame', () => {
    it('should create a new game', () => {
      const games = new Games();
      const game = games.createGame('room-tag', { rules: 'drinking', words: 'original' });
      expect(game.ruleset).toBe('drinking');
      expect(game.roomTag).toBe('room-tag');
    });
  });

  describe('#findById', () => {
    it('should return the game for a given ID', () => {
      const games = new Games();
      const { id } = games.createGame('room-tag', { rules: 'drinking', words: 'original' });
      const game = games.findById(id);
      expect(game.id).toBe(id);
      expect(game.ruleset).toBe('drinking');
      expect(game.roomTag).toBe('room-tag');
    });

    it('should return undefined if the game does not exist', () => {
      const games = new Games();
      games.createGame('room-tag', { rules: 'drinking', words: 'original' });
      expect(games.findById('NOTANID')).toBeUndefined();
    });
  });
});
