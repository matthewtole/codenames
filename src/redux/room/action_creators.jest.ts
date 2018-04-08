import { loadRoom, loadRoomSuccess } from './action_creators';
import { ActionTypes } from '../actions';
import { RulesetName, DictionaryName } from '../game/types';

describe('Room', () => {
  describe('ActionCreators', () => {
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
        const action = loadRoomSuccess({
          id: 'id',
          gameId: 'gameId',
          ruleset: RulesetName.STANDARD,
          dictionary: DictionaryName.ORIGINAL,
        });
        expect(action).toEqual({
          type: ActionTypes.ROOM_LOAD_SUCCESS,
          payload: {
            id: 'id',
            gameId: 'gameId',
            ruleset: RulesetName.STANDARD,
            dictionary: DictionaryName.ORIGINAL,
          },
        });
      });
    });
  });
});
