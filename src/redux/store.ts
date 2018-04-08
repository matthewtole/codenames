import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import { game, GameState } from './game/reducers';
import { setup, SetupState } from './setup/reducers';
import { room, RoomState } from './room/reducers';
import { ui, UIState } from './ui/reducers';

export interface State {
  game: GameState;
  setup: SetupState;
  room: RoomState;
  ui: UIState;
}

export const reducers = { game, setup, room, ui };

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // tslint:disable-line

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(sagas);
