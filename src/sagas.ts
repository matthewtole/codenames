import {
  takeEvery,
  select,
  put,
  takeLatest,
  fork,
  take,
} from 'redux-saga/effects';
import { ActionTypes } from './actions';
import {
  ActionCreateGame,
  setGameId,
  ActionSetGameId,
  ActionJoinGame,
  loadGame,
  createGame,
} from './actions/game';
import { FirebaseSync } from './lib/firebase';
import * as config from './config';
import { State } from './reducers';
import { ActionCreateRoom, roomCreated } from './actions/room-setup';
import {
  ActionLoadRoom,
  loadRoomSucess,
  ActionLoadRoomSuccess,
} from './actions/room';
import { eventChannel } from 'redux-saga';
import { push } from 'react-router-redux';
import { BoardMode } from './components/game/Board';

const firebase = new FirebaseSync(config.firebase);
firebase.connect();

function* gameCreate(action: ActionCreateGame) {
  const state: State = yield select();
  const id = yield firebase.createGame(state.game.data!);
  yield put(setGameId({ id }));
}

function* gameSetId(action: ActionSetGameId) {
  const state: State = yield select();
  yield firebase.setGameId(state.room.id!, state.room.gameId!);
}

function* roomCreate(action: ActionCreateRoom) {
  const state: State = yield select();
  const id = yield firebase.createRoom({
    wordlist: state.roomSetup.wordlist,
    ruleset: state.roomSetup.ruleset,
  });
  yield put(roomCreated({ id }));
  yield put(push(`/room/${id}/controller`));
}

function* roomLoad(action: ActionLoadRoom) {
  const data = yield firebase.loadRoom({ id: action.payload.id });
  yield put(loadRoomSucess(data));
}

function* roomLoaded(action: ActionLoadRoomSuccess) {
  const state: State = yield select();
  if (!state.room.loading && !state.room.gameId) {
    yield put(
      createGame({
        rules: state.room.ruleset!,
        words: state.room.wordlist!,
        mode: BoardMode.Controller,
      })
    );
  }
}

function* gameJoin(action: ActionJoinGame) {
  const data = yield firebase.joinGame({ id: action.payload.id });
  yield put(loadGame({ data }));
  yield fork(subscribe(action.payload.id));
}

function* syncGame() {
  const state: State = yield select();
  console.log(state.game.data!.winner); // tslint:disable-line
  yield firebase.sync({ id: state.game.id!, data: state.game.data! });
}

function subscribe(id: string) {
  return function*() {
    const channel = eventChannel(emit => {
      firebase.subscribe(id, emit);
      return () => firebase.unsubscribe(id);
    });

    while (true) {
      const data = yield take(channel);
      yield put(loadGame({ data }));
    }
  };
}

export function* sagas() {
  yield takeEvery(ActionTypes.ROOM_SETUP_CREATE_ROOM, roomCreate);
  yield takeEvery(ActionTypes.GAME_CREATE, gameCreate);
  yield takeLatest(ActionTypes.ROOM_LOAD, roomLoad);
  yield takeLatest(ActionTypes.GAME_SET_ID, gameSetId);
  yield takeLatest(ActionTypes.GAME_JOIN, gameJoin);
  yield takeLatest(ActionTypes.ROOM_LOAD_SUCCESS, roomLoaded);

  yield takeLatest(ActionTypes.GAME_CLEAR_MESSAGE, syncGame);
  yield takeLatest(ActionTypes.GAME_END_TURN, syncGame);
  yield takeLatest(ActionTypes.GAME_HIGHLIGHT_CARD, syncGame);
  yield takeLatest(ActionTypes.GAME_REVEAL_CARD, syncGame);
}
