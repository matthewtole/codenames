import * as React from 'react';
import { SetupContainer } from '../containers/Setup';
import { Navbar } from '../components/Navbar';

export class CreatePage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="has-navbar-fixed-top">
        <Navbar page="create" />
        <SetupContainer />
      </div>
    );
  }
}
