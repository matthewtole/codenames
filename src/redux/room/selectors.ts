import { RoomState } from './reducers';

export function isLoaded(state: RoomState): boolean {
  return !state.loading && !!state.id;
}
