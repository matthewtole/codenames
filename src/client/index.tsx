import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);

if (config.enableServiceWorker) {
  registerServiceWorker();
}
