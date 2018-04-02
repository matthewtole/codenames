import { game, GameState } from './game';
import { roomSetup, RoomSetupState } from './room-setup';
import { room, RoomState } from './room';

export interface State {
  game: GameState;
  roomSetup: RoomSetupState;
  room: RoomState;
}

export const reducers = { game, roomSetup, room };
