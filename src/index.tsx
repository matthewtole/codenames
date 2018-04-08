import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { Route } from 'react-router';

import 'bulma/css/bulma.css';
import 'bulma-checkradio/bulma-checkradio.css';
import './index.css';
import { ConnectedRouter } from 'react-router-redux';
import { Home } from './pages/Home';
import { PageGame } from './pages/Game';
import { GameSetupPage } from './pages/GameSetup';
import { PageRoom } from './pages/Room';
import { SetupPage } from './pages/Setup';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="Router">
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/game/" component={GameSetupPage} />
        <Route exact={true} path="/room/" component={SetupPage} />
        <Route exact={true} path="/room/:id/:mode?" component={PageRoom} />
        <Route exact={true} path="/game/:id/:mode?" component={PageGame} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
