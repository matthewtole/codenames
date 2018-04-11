import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { Route } from 'react-router';

import 'bulma/css/bulma.css';
import 'bulma-checkradio/dist/bulma-checkradio.min.css';
import './index.css';
import { ConnectedRouter } from 'react-router-redux';
import { Home } from './pages/Home';
import { PageRoom } from './pages/Room';
import { CreatePage } from './pages/Create';
import { JoinPage } from './pages/Join';
import { HelpPage } from './pages/Help';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="Router">
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/create" component={CreatePage} />
        <Route exact={true} path="/join" component={JoinPage} />
        <Route exact={true} path="/help" component={HelpPage} />
        <Route exact={true} path="/room/:id/:mode?" component={PageRoom} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
