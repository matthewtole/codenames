import { RoomState } from './reducers';
import * as RoomSelectors from './selectors';

describe('Room', () => {
  describe('Selectors', () => {
    describe('#isLoaded', () => {
      it('should return true if the room has loaded', () => {
        const state: RoomState = {
          id: 'test-id',
          loading: false,
        };
        expect(RoomSelectors.isLoaded(state)).toBeTruthy();
      });

      it('should return false if the room is loading', () => {
        const state: RoomState = {
          id: 'test-id',
          loading: true,
        };
        expect(RoomSelectors.isLoaded(state)).toBeFalsy();
      });

      it('should return false if the ID has not been set', () => {
        const state: RoomState = {};
        expect(RoomSelectors.isLoaded(state)).toBeFalsy();
      });
    });
  });
});
