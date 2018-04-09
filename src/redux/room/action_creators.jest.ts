import {
  loadRoom,
  loadRoomSuccess,
  createRoom,
  createRoomSuccess,
  generateCode,
  generateCodeSuccess,
  clearCode,
  joinRoom,
  joinRoomError,
} from './action_creators';
import { ActionTypes } from '../actions';
import { RulesetName, DictionaryName } from '../game/types';

describe('Room', () => {
  describe('ActionCreators', () => {
    describe('#loadRoom', () => {
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

    describe('#loadRoomSucess', () => {
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

    describe('#createRoom', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = createRoom({ id: 'test-id' });
        expect(action).toEqual({
          type: ActionTypes.ROOM_CREATE,
          payload: {
            id: 'test-id',
          },
        });
      });
    });

    describe('#createRoomSuccess', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = createRoomSuccess();
        expect(action).toEqual({
          type: ActionTypes.ROOM_CREATE_SUCCESS,
          payload: {},
        });
      });
    });

    describe('#generateCode', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = generateCode();
        expect(action).toEqual({
          type: ActionTypes.ROOM_GENERATE_CODE,
          payload: {},
        });
      });
    });

    describe('#generateCodeSuccess', () => {
      it('should return an ActionCreateRoom object', () => {
        const code = '000000';
        const timeout = new Date();
        const action = generateCodeSuccess({
          code,
          timeout,
        });
        expect(action).toEqual({
          type: ActionTypes.ROOM_GENERATE_CODE_SUCCESS,
          payload: {
            code,
            timeout,
          },
        });
      });
    });

    describe('#clearCode', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = clearCode();
        expect(action).toEqual({
          type: ActionTypes.ROOM_CLEAR_CODE,
          payload: {},
        });
      });
    });

    describe('#joinRoom', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = joinRoom({ code: '000000' });
        expect(action).toEqual({
          type: ActionTypes.ROOM_JOIN,
          payload: {
            code: '000000',
          },
        });
      });
    });

    describe('#joinRoomError', () => {
      it('should return an ActionCreateRoom object', () => {
        const action = joinRoomError({
          code: '000000',
          error: 'error message',
        });
        expect(action).toEqual({
          type: ActionTypes.ROOM_JOIN_ERROR,
          payload: {
            code: '000000',
            error: 'error message',
          },
        });
      });
    });
  });
});
