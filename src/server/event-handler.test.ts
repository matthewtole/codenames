// import { Games } from './shared/games';
// import {
//   Message,
//   MessageRoomCreate,
//   MessageRoomCreated,
//   MessageRoomJoin,
//   MessageRoomJoined,
//   MessageType,
// } from './shared/messages';
// import { Rooms, RoomTag } from './shared/rooms';
// import * as winston from 'winston';
// import { handleMessage } from './message-sender';

// winston.remove(winston.transports.Console); // TODO: This is overly aggressive.

// let sentMessages: Message[] = [];

// function sendMessage(message: Message) {
//   sentMessages.push(message);
// }

describe('EventSender', () => {
  it('should be tested');
});
//   let rooms: Rooms;
//   let games: Games;

//   function wrappedHandleMessage(message: Message) {
//     return handleMessage(rooms, games, message, sendMessage);
//   }

//   beforeEach(() => {
//     sentMessages = [];
//     rooms = new Rooms();
//     games = new Games();
//   });

//   describe('#handleMessage', () => {

//     it('should silently ignore unknown message types', () => {
//       wrappedHandleMessage({ type: -10 });
//     });

//     describe('[RoomCreate]', () => {
//       it('should create a new room', () => {
//         const message: MessageRoomCreate = {
//           type: MessageType.RoomCreate,
//           options: {
//             words: 'original',
//             rules: 'standard',
//           },
//         };
//         wrappedHandleMessage(message);
//         expect(Object.keys(rooms.rooms).length).toBe(1);
//         const tag = Object.keys(rooms.rooms)[0];
//         expect(rooms.getRoom(tag).words).toBe('original');
//       });

//       it('should respond with a RoomCreated message', () => {
//         const createMessage: MessageRoomCreate = {
//           type: MessageType.RoomCreate,
//           options: {
//             words: 'original',
//             rules: 'standard',
//           },
//         };
//         wrappedHandleMessage(createMessage);
//         expect(sentMessages.length).toBe(1);
//         const createdMessage: MessageRoomCreated = sentMessages[0] as MessageRoomCreated;
//         expect(createdMessage.type).toBe(MessageType.RoomCreated);
//         expect(rooms.getRoom(createdMessage.roomTag));
//       });
//     }); // [RoomCreate]

//     describe('[RoomJoin]', () => {
//       let roomTag: RoomTag;

//       beforeEach(() => {
//         roomTag = rooms.createRoom({
//           words: 'original',
//           rules: 'standard',
//         }).tag;
//       });

//       it('should send a RoomJoined message', () => {
//         const joinMessage: MessageRoomJoin = { roomTag, type: MessageType.RoomJoin };
//         wrappedHandleMessage(joinMessage);
//         expect(sentMessages.length).toBe(1);
//         const joinedMessage: MessageRoomJoined = sentMessages[0] as MessageRoomJoined;
//         expect(joinedMessage.type).toBe(MessageType.RoomJoined);
//         expect(joinedMessage.roomTag).toBe(roomTag);
//       });

//       it('should send an Error message if room tag does not exist', () => {
//         const joinMessage: MessageRoomJoin = { roomTag: 'invalid', type: MessageType.RoomJoin };
//         wrappedHandleMessage(joinMessage);
//         expect(sentMessages.length).toBe(1);
//         expect(sentMessages[0].type).toBe(MessageType.Error);
//       });

//       it('should send a GameState message if the room has an active game');
//     }); // [RoomJoin]
//   });
// });
