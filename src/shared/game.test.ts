import { words as WordLists } from './data/words';
import { Game, Role, Team } from './game';

const ROOM_TAG = 'abcdef';
const DEFAULT_OPTIONS = { words: 'original', rules: 'standard' };

describe('Game', () => {
  describe('#constructor', () => {
    it('should create the initial game state', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      expect(game.roomTag).toBe(ROOM_TAG);
      expect(game.cards.length).toBe(25);
      expect(game.highlighted).toBe(undefined);
    });

    it('should use words from the specified word list', () => {
      const game = new Game(ROOM_TAG, { words: 'undercover', rules: 'standard' });
      game.cards.forEach((card) => {
        expect(WordLists.undercover.indexOf(card.word)).toBeGreaterThanOrEqual(0);
      });
    });

    it('should throw an error on invalid game options', () => {
      expect(() => {
        const game = new Game(ROOM_TAG, { words: 'invalid', rules: 'standard' });
        expect(game);
      }).toThrow();

      expect(() => {
        const game = new Game(ROOM_TAG, { words: 'original', rules: 'kerazy' });
        expect(game);
      }).toThrow();
    });
  }); // #constructor

  describe('#highlightCard', () => {
    it('should highlight the card at the specified location', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      expect(game.cards[0].highlighted).toBe(false);
      game.highlightCard({ row: 0, col: 0 });
      expect(game.cards[0].highlighted).toBe(true);
    });

    it('should un-highlight any previously highlighted card', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.highlightCard({ row: 0, col: 0 });
      expect(game.cards[0].highlighted).toBe(true);
      game.highlightCard({ row: 4, col: 4 });
      expect(game.cards[24].highlighted).toBe(true);
      expect(game.cards[0].highlighted).toBe(false);
    });

    it('should un-highlight previously highlighted card when passed no arguments', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.highlightCard({ row: 0, col: 0 });
      expect(game.cards[0].highlighted).toBe(true);
      game.highlightCard();
      expect(game.cards[0].highlighted).toBe(false);
    });

    it('should not throw an error if given an invalid card location', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.highlightCard({ row: 10, col: 10 });
    });

    it('should not highlighted a revealed card', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.revealCard({ row: 0, col: 0 });
      expect(game.cards[0].revealed).toBe(true);
      game.highlightCard({ row: 0, col: 0 });
      expect(game.cards[0].highlighted).toBe(false);
    });
  }); // #highlightCard

  describe('#revealCard', () => {
    it('should not throw an error if given an invalid card location', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.revealCard({ row: 10, col: 10 });
    });

    it('should set the revealed property of the card to true', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.revealCard({ row: 0, col: 0 });
      expect(game.cards[0].revealed).toBe(true);
    });

    it('should do nothing if the card is already revealed', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.revealCard({ row: 0, col: 0 });
      expect(game.cards[0].revealed).toBe(true);
      game.revealCard({ row: 0, col: 0 });
      expect(game.cards[0].revealed).toBe(true);
    });

    it('should clear the highlighted card', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      game.highlightCard({ row: 0, col: 1 });
      expect(game.cards[1].highlighted).toBeTruthy();
      game.revealCard({ row: 0, col: 0 });
      expect(game.cards[1].highlighted).toBeFalsy();
    });

    it('should switch the turn if the card is an innocent bystander', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const index = findCardByRole(game, Role.Bystander);
      const turn = game.turn;
      expect(game.cards[index].revealed).toBeFalsy();
      game.revealCard(Game.indexToCoordinate(index));
      expect(game.cards[index].revealed).toBeTruthy();
      expect(game.turn).toBe(Game.otherPlayer(turn));
    });

    it('should not switch the turn if the card belongs to the active player', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const turn = game.turn;
      const index = findCardByRole(game, Game.teamToRole(turn));
      expect(game.cards[index].revealed).toBeFalsy();
      game.revealCard(Game.indexToCoordinate(index));
      expect(game.cards[index].revealed).toBeTruthy();
      expect(game.turn).toBe(turn);
    });

    it('should switch the turn if the card belongs to the other player', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const turn = game.turn;
      const index = findCardByRole(game, Game.teamToRole(Game.otherPlayer(turn)));
      expect(game.cards[index].revealed).toBeFalsy();
      game.revealCard(Game.indexToCoordinate(index));
      expect(game.cards[index].revealed).toBeTruthy();
      expect(game.turn).toBe(Game.otherPlayer(turn));
    });

    it('should end the game if the card is an assassin', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const index = findCardByRole(game, Role.Assassin);
      const turn = game.turn;
      expect(game.cards[index].revealed).toBeFalsy();
      game.revealCard(Game.indexToCoordinate(index));
      expect(game.cards[index].revealed).toBeTruthy();
      expect(game.winner).toBe(Game.otherPlayer(turn));
    });

    it('should end the game if all of a player cards are found', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const turn = game.turn;
      for (let c = 0; c <= 9; c += 1) {
        const index = findCardByRole(game, Game.teamToRole(turn), { revealed: false });
        game.revealCard(Game.indexToCoordinate(index));
      }
      expect(game.winner).toBe(turn);
    });
  });

  describe('#endTurn', () => {
    it('switches the turn', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const turn = game.turn;
      game.endTurn();
      expect(game.turn).toEqual(Game.otherPlayer(turn));
      game.endTurn();
      expect(game.turn).toEqual(turn);
    });
  });

  describe('#clearMessage', () => {
    it('clears the message', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const index = findCardByRole(game, Role.Assassin);
      game.revealCard(Game.indexToCoordinate(index));
      expect(game.state.message).not.toBeUndefined();
      game.clearMessage();
      expect(game.state.message).toBeUndefined();
    });
  });

  describe('.state', () => {
    it('returns a GameState object', () => {
      const game = new Game(ROOM_TAG, DEFAULT_OPTIONS);
      const state = game.state;
      expect(state);
    });
  });

  describe('#coordinateToIndex', () => {
    it('should return the correct index for valid coordinates', () => {
      expect(Game.coordinateToIndex({ row: 0, col: 0 })).toBe(0);
      expect(Game.coordinateToIndex({ row: 4, col: 0 })).toBe(20);
      expect(Game.coordinateToIndex({ row: 4, col: 4 })).toBe(24);
      expect(Game.coordinateToIndex({ row: 0, col: 4 })).toBe(4);
    });

    it('should return -1 for all invalid coordinates', () => {
      expect(Game.coordinateToIndex({ row: -1, col: 0 })).toBe(-1);
      expect(Game.coordinateToIndex({ row: 0, col: -1 })).toBe(-1);
      expect(Game.coordinateToIndex({ row: 5, col: 0 })).toBe(-1);
      expect(Game.coordinateToIndex({ row: 0, col: 5 })).toBe(-1);
    });
  });

  describe('#indexToCoordinate', () => {
    it('should return the correct coordinates for valid indexes', () => {
      expect(Game.indexToCoordinate(0)).toEqual({ row: 0, col: 0 });
      expect(Game.indexToCoordinate(20)).toEqual({ row: 4, col: 0 });
      expect(Game.indexToCoordinate(24)).toEqual({ row: 4, col: 4 });
      expect(Game.indexToCoordinate(4)).toEqual({ row: 0, col: 4 });
    });

    it('should return undefined for all invalid indexes', () => {
      expect(Game.indexToCoordinate(-1)).toBeUndefined();
      expect(Game.indexToCoordinate(25)).toBeUndefined();
      expect(Game.indexToCoordinate(1000)).toBeUndefined();
    });
  });

  describe('#otherPlayer', () => {
    it('should return the other team value', () => {
      expect(Game.otherPlayer(Team.Blue)).toBe(Team.Red);
      expect(Game.otherPlayer(Team.Red)).toBe(Team.Blue);
    });
  });

  describe('#teamToRole', () => {
    it('should return the correct role for the two teams', () => {
      expect(Game.teamToRole(Team.Blue)).toBe(Role.BlueSpy);
      expect(Game.teamToRole(Team.Red)).toBe(Role.RedSpy);
    });
  });

  describe('#roleToTeam', () => {
    it('should return the correct team for the two spy roles', () => {
      expect(Game.roleToTeam(Role.RedSpy)).toBe(Team.Red);
      expect(Game.roleToTeam(Role.BlueSpy)).toBe(Team.Blue);
    });

    it('should return undefined for the assassin and bystander roles', () => {
      expect(Game.roleToTeam(Role.Assassin)).toBeUndefined();
      expect(Game.roleToTeam(Role.Bystander)).toBeUndefined();
    });
  });
});

function findCardByRole(game: Game, role: Role, options?: { revealed?: boolean }): number {
  for (let index = 0; index < game.cards.length; index += 1) {
    if (game.cards[index].role === role) {
      if (options !== undefined) {
        if (options.revealed !== undefined && game.cards[index].revealed !== options.revealed) {
          continue;
        }
      }
      return index;
    }
  }
  return -1;
}
