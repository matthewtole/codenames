import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { reducers } from './reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';

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
