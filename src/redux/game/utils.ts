import { Team, Role, Coordinate } from './types';

export const otherPlayer = (color: Team): Team => {
  if (color === Team.RED) {
    return Team.BLUE;
  }
  return Team.RED;
};

export const teamToRole = (team: Team): Role => {
  if (team === Team.RED) {
    return Role.RED_SPY;
  }
  return Role.BLUE_SPY;
};

export const roleToTeam = (role: Role): Team => {
  switch (role) {
    case Role.RED_SPY:
      return Team.RED;
    case Role.BLUE_SPY:
      return Team.BLUE;
    default:
      throw new Error();
  }
};

export const coordinateToIndex = (coordinate: Coordinate): number => {
  if (
    coordinate.row < 0 ||
    coordinate.row >= 5 ||
    coordinate.col < 0 ||
    coordinate.col >= 5
  ) {
    throw new Error();
  }
  return coordinate.row * 5 + coordinate.col;
};

export const indexToCoordinate = (index: number): Coordinate => {
  if (index < 0 || index >= 5 * 5) {
    throw new Error();
  }
  const col = index % 5;
  const row = (index - col) / 5;
  return { col, row };
};
