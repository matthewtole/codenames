import * as React from 'react';
import { Navbar } from '../components/Navbar';

export class HelpPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="has-navbar-fixed-top">
        <Navbar page="help" />
        <h1>Help!</h1>
      </div>
    );
  }
}
