import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { Route } from 'react-router';
import DocumentTitle from 'react-document-title';

import './index.scss';
import { ConnectedRouter } from 'react-router-redux';
import { Home } from './pages/Home';
import { PageRoom } from './pages/Room';
import { CreatePage } from './pages/Create';
import { JoinPage } from './pages/Join';
import { HelpPage } from './pages/Help';

ReactDOM.render(
  <DocumentTitle title="Codenames">
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
    </Provider>
  </DocumentTitle>,
  document.getElementById('root') as HTMLElement
);

// tslint:disable
if (process.env.NODE_ENV === 'production') {
  (window as any).Raven.config(
    'https://59d80f4d5ace403f83ba45c19f11aa06@sentry.io/1187696'
  ).install();
}
