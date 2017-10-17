import config from '../config';
import { Room, RoomOptions } from '../../shared/rooms';

export function createRoom(options: RoomOptions): Promise<Room> {
  const request = new Request(`${config.apiRoot}/api/v1/room`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      options,
      createGame: true,
    }),
  });
  return fetch(request).then(res => res.json());
}
