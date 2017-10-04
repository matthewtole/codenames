import { Rooms } from './rooms';

const DEFAULT_OPTIONS = { words: 'original', rules: 'standard' };

describe('Rooms', () => {
  describe('#createRoom', () => {
    it('should create a new room', () => {
      const rooms = new Rooms();
      const room = rooms.createRoom(DEFAULT_OPTIONS);
      expect(room);
      expect(rooms.getRoom(room.tag)).toEqual(room);
    });

    it('should throw error if options are invalid', () => {
      expect(() => {
        const rooms = new Rooms();
        const room = rooms.createRoom({
          words: 'bad',
          rules: 'standard',
        });
      }).toThrowError();

      expect(() => {
        const rooms = new Rooms();
        const room = rooms.createRoom({
          words: 'original',
          rules: 'terrible',
        });
      }).toThrowError();
    });
  });

  describe('#getRoom', () => {
    it('should return undefined if the room tag does not exist', () => {
      const rooms = new Rooms();
      expect(rooms.getRoom('not-a-room')).toEqual(undefined);
    });
  });

  describe('#purgeOldRooms', () => {
    it('should delete rooms that have not been accessed in 24 hours', () => {
      const rooms = new Rooms();
      const { tag: tag1 } = rooms.createRoom(DEFAULT_OPTIONS);
      const { tag: tag2 } = rooms.createRoom(DEFAULT_OPTIONS);
      expect(rooms.getRoom(tag1));
      expect(rooms.getRoom(tag2));
      rooms.rooms[tag1].lastAccessed = new Date(0);
      rooms.purgeOldRooms();
      expect(rooms.getRoom(tag1)).toEqual(undefined);
      expect(rooms.getRoom(tag2));
    });
  });
});
