import { setRuleset, setWordlist, createRoom, roomCreated } from './room-setup';
import { ActionTypes } from './index';

describe('Room Setup Actions', () => {
  describe('setRuleset', () => {
    it('should return an ActionRuleset object', () => {
      const ruleset = 'drink';
      const action = setRuleset({ ruleset });
      expect(action).toEqual({
        type: ActionTypes.ROOM_SETUP_SET_RULESET,
        payload: {
          ruleset,
        },
      });
    });
  });

  describe('setWordlist', () => {
    it('should return an ActionSetWordlist object', () => {
      const wordlist = 'original';
      const action = setWordlist({ wordlist });
      expect(action).toEqual({
        type: ActionTypes.ROOM_SETUP_SET_WORDLIST,
        payload: {
          wordlist,
        },
      });
    });
  });

  describe('createRoom', () => {
    it('should return an ActionCreateRoom object', () => {
      const action = createRoom();
      expect(action).toEqual({
        type: ActionTypes.ROOM_SETUP_CREATE_ROOM,
        payload: {},
      });
    });
  });

  describe('roomCreated', () => {
    it('should return an ActionRoomCreated object', () => {
      const id = 'id';
      const action = roomCreated({ id });
      expect(action).toEqual({
        type: ActionTypes.ROOM_SETUP_ROOM_CREATED,
        payload: {
          id,
        },
      });
    });
  });
});
