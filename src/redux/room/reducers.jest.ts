import { room } from './reducers';
import {
  loadRoom,
  loadRoomSuccess,
  generateCodeSuccess,
  clearCode,
  joinRoom,
  joinRoomError,
} from './action_creators';
import { RulesetName, DictionaryName } from '../game/types';
import { loadGame } from '../game/action_creators';

describe('Room', () => {
  describe('Reducers', () => {
    describe('ROOM_LOAD', () => {
      it('should set the ID and loading to true', () => {
        const nextState = room(
          undefined,
          loadRoom({
            id: 'test-id',
          })
        );
        expect(nextState).toEqual({
          id: 'test-id',
          loading: true,
        });
      });
    });

    describe('ROOM_LOAD_SUCCESS', () => {
      it('should populate the store with data', () => {
        const nextState = room(
          undefined,
          loadRoomSuccess({
            id: 'test-id',
            gameId: 'game-id',
            ruleset: RulesetName.DRINKING,
            dictionary: DictionaryName.UNDERCOVER,
          })
        );
        expect(nextState.id).toBe('test-id');
        expect(nextState.gameId).toBe('game-id');
        expect(nextState.loading).toBeFalsy();
        expect(nextState.ruleset).toBe(RulesetName.DRINKING);
        expect(nextState.dictionary).toBe(DictionaryName.UNDERCOVER);
      });
    });

    describe('GAME_LOAD', () => {
      it('should set the gameId', () => {
        const nextState = room(undefined, loadGame({ id: 'game-id' }));
        expect(nextState.gameId).toBe('game-id');
      });
    });

    describe('ROOM_GENERATE_CODE_SUCCESS', () => {
      it('should set the code', () => {
        const nextState = room(
          undefined,
          generateCodeSuccess({ code: '000000', timeout: new Date() })
        );
        expect(nextState.code).toBe('000000');
      });
    });

    describe('ROOM_CLEAR_CODE', () => {
      it('should clear the code', () => {
        const nextState = room(undefined, clearCode());
        expect(nextState.code).toBeUndefined();
      });
    });

    describe('ROOM_JOIN', () => {
      it('should clear the joinError', () => {
        const nextState = room(
          { error: 'error' },
          joinRoom({ code: '000000' })
        );
        expect(nextState.error).toBeUndefined();
      });
    });

    describe('ROOM_JOIN_ERROR', () => {
      it('should set the joinError', () => {
        const nextState = room(
          undefined,
          joinRoomError({ code: '000000', error: 'error' })
        );
        expect(nextState.error).toBe('error');
      });
    });
  });
});
