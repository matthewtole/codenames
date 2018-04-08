import * as React from 'react';
import { SetupContainer } from '../containers/Setup';

export class SetupPage extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return <SetupContainer />;
  }
}
