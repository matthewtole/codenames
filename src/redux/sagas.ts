import { ActionTypes } from './actions';
import * as uuid from 'uuid';
import {
  takeEvery,
  select,
  put,
  takeLatest,
  fork,
  take,
} from 'redux-saga/effects';
import {
  ActionCreateRoom,
  ActionLoadRoom,
  ActionLoadRoomSuccess,
} from './room/actions';
import { createRoomSuccess, loadRoomSuccess } from './room/action_creators';
import { push } from 'react-router-redux';
import { eventChannel } from 'redux-saga';

import { FirebaseSync } from '../lib/firebase';
import * as config from '../config';
import { State } from './store';
import { createGame, loadGame, loadGameSuccess } from './game/action_creators';
import { ActionCreateGame, ActionLoadGame } from './game/actions';
import { GameStateLoaded } from './game/reducers';

const firebase = new FirebaseSync(config.firebase);
firebase.connect();

function* gameCreate(action: ActionCreateGame) {
  const state: State = yield select();
  yield firebase.createGame(state.game);
  yield firebase.setGameId(state.room.id!, state.game.id!);
}

function* roomCreate(action: ActionCreateRoom) {
  const state: State = yield select();
  const { id } = action.payload;
  const { ruleset, dictionary } = state.setup;

  yield firebase.createRoom({
    id,
    ruleset,
    dictionary,
  });
  yield put(createRoomSuccess());
  yield put(push(`/room/${id}/controller`));
}

function* roomLoad(action: ActionLoadRoom) {
  const data = yield firebase.loadRoom({ id: action.payload.id });
  yield put(loadRoomSuccess(data));
  yield fork(subscribeToRoom(action.payload.id));
}

function* roomLoaded(action: ActionLoadRoomSuccess) {
  const state: State = yield select();
  if (!state.room.gameId) {
    yield put(
      createGame({
        id: uuid.v4(),
        ruleset: state.room.ruleset!,
        dictionary: state.room.dictionary!,
      })
    );
  }
}

function* gameLoad(action: ActionLoadGame) {
  const data = yield firebase.loadGame({ id: action.payload.id });
  yield put(loadGameSuccess(data));
  yield fork(subscribeToGame(action.payload.id));
}

function* syncGame() {
  const state: State = yield select();
  yield firebase.sync({
    id: state.game.id!,
    data: state.game as GameStateLoaded,
  });
}

function subscribeToGame(id: string) {
  return function*() {
    const channel = eventChannel(emit => {
      firebase.subscribeToGame(id, emit);
      return () => firebase.unsubscribeFromGame(id);
    });

    while (true) {
      const data = yield take(channel);
      yield put(loadGameSuccess(data));
    }
  };
}

function subscribeToRoom(id: string) {
  return function*() {
    const channel = eventChannel(emit => {
      firebase.subscribeToRoom(id, emit);
      return () => firebase.unsubscribeFromRoom(id);
    });

    while (true) {
      const data = yield take(channel);
      yield put(loadGame({ id: data.gameId }));
      yield put(
        loadRoomSuccess({
          ...data,
          id,
        })
      );
    }
  };
}

export function* sagas() {
  yield takeEvery(ActionTypes.ROOM_CREATE, roomCreate);
  yield takeEvery(ActionTypes.GAME_CREATE, gameCreate);
  yield takeLatest(ActionTypes.ROOM_LOAD, roomLoad);
  yield takeLatest(ActionTypes.ROOM_LOAD_SUCCESS, roomLoaded);
  yield takeLatest(ActionTypes.GAME_LOAD, gameLoad);
  yield takeLatest(ActionTypes.GAME_CLEAR_MESSAGE, syncGame);
  yield takeLatest(ActionTypes.GAME_END_TURN, syncGame);
  yield takeLatest(ActionTypes.GAME_HIGHLIGHT_CARD, syncGame);
  yield takeLatest(ActionTypes.GAME_REVEAL_CARD, syncGame);
}