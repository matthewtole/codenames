import * as GameUtils from './utils';
import { Team, Role } from './types';

describe('Game', () => {
  describe('Utils', () => {
    describe('otherPlayer', () => {
      it('should return Team.RED when given Team.BLUE', () => {
        expect(GameUtils.otherPlayer(Team.BLUE)).toBe(Team.RED);
      });

      it('should return Team.BLUE when given Team.RED', () => {
        expect(GameUtils.otherPlayer(Team.RED)).toBe(Team.BLUE);
      });
    });

    describe('teamToRole', () => {
      it('should return Role.RED_SPY when given Team.RED', () => {
        expect(GameUtils.teamToRole(Team.RED)).toBe(Role.RED_SPY);
      });

      it('should return Role.BLUE_SPY when given Team.BLUE', () => {
        expect(GameUtils.teamToRole(Team.BLUE)).toBe(Role.BLUE_SPY);
      });
    });

    describe('roleToTeam', () => {
      it('should return Team.RED when given Role.RED_SPY', () => {
        expect(GameUtils.roleToTeam(Role.RED_SPY)).toBe(Team.RED);
      });

      it('should return Team.BLUE when given Role.BLUE_SPY', () => {
        expect(GameUtils.roleToTeam(Role.BLUE_SPY)).toBe(Team.BLUE);
      });

      it('should throw when given any other Role', () => {
        expect(() => {
          GameUtils.roleToTeam(Role.ASSASSIN);
        }).toThrow();

        expect(() => {
          GameUtils.roleToTeam(Role.BYSTANDER);
        }).toThrow();
      });
    });

    describe('coordinateToIndex', () => {
      it('should return an array index for valid coordinates', () => {
        expect(GameUtils.coordinateToIndex({ row: 0, col: 0 })).toBe(0);
        expect(GameUtils.coordinateToIndex({ row: 4, col: 4 })).toBe(24);
        expect(GameUtils.coordinateToIndex({ row: 1, col: 0 })).toBe(5);
        expect(GameUtils.coordinateToIndex({ row: 0, col: 1 })).toBe(1);
      });

      it('should throw an error for invalid coordinates', () => {
        expect(() =>
          GameUtils.coordinateToIndex({ col: -1, row: 0 })
        ).toThrow();

        expect(() => GameUtils.coordinateToIndex({ col: 5, row: 0 })).toThrow();

        expect(() =>
          GameUtils.coordinateToIndex({ col: 0, row: -1 })
        ).toThrow();

        expect(() => GameUtils.coordinateToIndex({ col: 0, row: 5 })).toThrow();
      });
    });

    describe('indexToCoordindate', () => {
      it('should return a coordinate object for valid indices', () => {
        expect(GameUtils.indexToCoordinate(0)).toEqual({ row: 0, col: 0 });
        expect(GameUtils.indexToCoordinate(24)).toEqual({ row: 4, col: 4 });
        expect(GameUtils.indexToCoordinate(5)).toEqual({ row: 1, col: 0 });
        expect(GameUtils.indexToCoordinate(1)).toEqual({ row: 0, col: 1 });
      });

      it('should throw an error for invalid indices', () => {
        expect(() => GameUtils.indexToCoordinate(-1)).toThrow();
        expect(() => GameUtils.indexToCoordinate(25)).toThrow();
      });
    });
  });
});
