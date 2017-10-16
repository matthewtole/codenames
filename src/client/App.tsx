import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Home } from './routes/Home';
import { Room } from './routes/Room';
import { Error404 } from './routes/Error404';

interface AppProps {}

class App extends React.Component<AppProps, { }> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="Router">
          <Route exact={true} path="/" component={Home}/>
          <Route path="/room/:tag/:mode?" component={Room} />
          <Route path="/404" component={Error404} />
          {/* <Redirect to="/404" /> */}
        </div>
      </Router>
    );
  }
}

export default App;