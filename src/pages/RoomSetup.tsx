import * as React from 'react';
import { RoomSetupContainer } from '../containers/RoomSetup';

export class RoomSetupPage extends React.Component<{}, {}> {
  constructor() {
    super({});
  }

  render() {
    return <RoomSetupContainer />;
  }
}
