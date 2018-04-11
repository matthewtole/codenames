import * as React from 'react';
import { JoinContainer } from '../containers/Join';
import { Navbar } from '../components/Navbar';

export class JoinPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="has-navbar-fixed-top">
        <Navbar page="create" />
        <JoinContainer />
      </div>
    );
  }
}
