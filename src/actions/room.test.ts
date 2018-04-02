import { loadRoom, loadRoomSucess } from './room';
import { ActionTypes } from './index';

describe('Room Actions', () => {
  describe('loadRoom', () => {
    it('should return an ActionLoadRoom object', () => {
      const action = loadRoom({
        id: 'id',
      });
      expect(action).toEqual({
        type: ActionTypes.ROOM_LOAD,
        payload: {
          id: 'id',
        },
      });
    });
  });

  describe('loadRoomSucess', () => {
    it('should return an ActionLoadRoomSuccess object', () => {
      const action = loadRoomSucess({
        id: 'id',
        gameId: 'gameId',
        ruleset: 'standard',
        wordlist: 'original',
      });
      expect(action).toEqual({
        type: ActionTypes.ROOM_LOAD_SUCCESS,
        payload: {
          id: 'id',
          gameId: 'gameId',
          ruleset: 'standard',
          wordlist: 'original',
        },
      });
    });
  });
});
