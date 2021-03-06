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
  ActionGenerateCode,
  ActionJoinRoom,
  ActionChangeRuleset,
  ActionChangeDictionary,
} from './room/actions';
import {
  createRoomSuccess,
  loadRoomSuccess,
  generateCodeSuccess,
  joinRoomError,
  loadRoomError,
} from './room/action_creators';
import {
  push,
  LOCATION_CHANGE,
  LocationChangeAction,
} from 'react-router-redux';
import { eventChannel, Channel } from 'redux-saga';

import { FirebaseSync } from '../lib/firebase';
import * as config from '../config';
import { State } from './store';
import { createGame, loadGame, loadGameSuccess } from './game/action_creators';
import { ActionCreateGame, ActionLoadGame } from './game/actions';
import { GameStateLoaded } from './game/reducers';
import { ActionEnterFullscreen, ActionExitFullscreen } from './ui/actions';
import { Fullscreen } from '../lib/fullscreen';
import { setIsFullscreen } from './ui/action_creators';

import { ReactGA } from '../analytics';

const firebase = new FirebaseSync(config.firebase);
firebase.connect();

function* gameCreate(action: ActionCreateGame) {
  const state: State = yield select();
  yield firebase.setGameId(state.room.id!, state.game.id!);
  yield firebase.createGame(state.game);
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
  try {
    const data = yield firebase.loadRoom({ id: action.payload.id });
    yield put(loadRoomSuccess(data));
    yield fork(subscribeToRoom(action.payload.id));
  } catch (ex) {
    yield put(loadRoomError({ error: ex.message }));
  }
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
  if (data) {
    yield put(loadGameSuccess(data));
    yield fork(subscribeToGame(action.payload.id));
  } else {
    yield put(loadGame({ id: action.payload.id }));
  }
}

function* syncGame() {
  const state: State = yield select();
  yield firebase.sync({
    id: state.game.id!,
    data: state.game as GameStateLoaded,
  });
}

let gameChannel: Channel<{}> | undefined = undefined;

function subscribeToGame(id: string) {
  return function*() {
    unsubscribeFromGame();
    gameChannel = eventChannel(emit => {
      firebase.subscribeToGame(id, emit);
      return () => firebase.unsubscribeFromGame(id);
    });

    while (true) {
      const data = yield take(gameChannel);
      yield put(loadGameSuccess(data));
    }
  };
}

function unsubscribeFromGame() {
  if (gameChannel) {
    gameChannel.close();
    gameChannel = undefined;
  }
}

let roomChannel: Channel<{}> | undefined = undefined;

function subscribeToRoom(id: string) {
  return function*() {
    unsubscribeFromRoom();
    roomChannel = eventChannel(emit => {
      firebase.subscribeToRoom(id, emit);
      return () => firebase.unsubscribeFromRoom(id);
    });

    while (true) {
      const data = yield take(roomChannel);
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

function unsubscribeFromRoom() {
  if (roomChannel) {
    roomChannel.close();
    roomChannel = undefined;
    unsubscribeFromGame();
  }
}

function* generateCode(action: ActionGenerateCode) {
  const state: State = yield select();
  const { code, timeout } = yield firebase.generateCode(state.room.id!);
  yield put(generateCodeSuccess({ code, timeout }));
}

function* joinRoom(action: ActionJoinRoom) {
  const { code } = action.payload;
  const id = yield firebase.findRoomByCode(code);
  if (id) {
    yield put(push(`/room/${id}/viewer`));
  } else {
    yield put(
      joinRoomError({ code, error: `${code} is not a valid room code!` })
    );
  }
}

function enterFullscreen(action: ActionEnterFullscreen) {
  Fullscreen.enter();
}

function exitFullscreen(action: ActionExitFullscreen) {
  Fullscreen.leave();
}

function subscribeToFullscreen() {
  return function*() {
    const channel = eventChannel(emit => {
      Fullscreen.subscribe(emit);
      return () => Fullscreen.unsubscribe();
    });

    while (true) {
      const isFullscreen: boolean = yield take(channel);
      yield put(setIsFullscreen({ isFullscreen }));
    }
  };
}

function* changeDictionary(action: ActionChangeDictionary) {
  const state: State = yield select();
  yield firebase.updateRoom(state.room.id!, {
    dictionary: action.payload.dictionary,
  });
}

function* changeRuleset(action: ActionChangeRuleset) {
  const state: State = yield select();
  yield firebase.updateRoom(state.room.id!, {
    ruleset: action.payload.ruleset,
  });
}

function isRoomPath(path: string): boolean {
  return !!/\/room\//.exec(path);
}

function locationChange(action: LocationChangeAction) {
  if (!isRoomPath(action.payload.pathname)) {
    unsubscribeFromRoom();
  }
  ReactGA.pageview(action.payload.pathname);
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
  yield takeLatest(ActionTypes.ROOM_GENERATE_CODE, generateCode);
  yield takeLatest(ActionTypes.ROOM_JOIN, joinRoom);
  yield takeEvery(ActionTypes.UI_ENTER_FULLSCREEN, enterFullscreen);
  yield takeEvery(ActionTypes.UI_EXIT_FULLSCREEN, exitFullscreen);
  yield takeLatest(ActionTypes.ROOM_CHANGE_DICTIONARY, changeDictionary);
  yield takeLatest(ActionTypes.ROOM_CHANGE_RULESET, changeRuleset);

  yield fork(subscribeToFullscreen());

  yield takeEvery(LOCATION_CHANGE, locationChange);
}
