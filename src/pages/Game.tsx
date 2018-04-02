import * as React from 'react';
import { ConnectedTest } from '../containers/Game';
import { RouteComponentProps } from 'react-router';
import { BoardMode } from '../components/game/Board';

interface Props extends RouteComponentProps<{ id: string; mode: string }> {}

export class PageGame extends React.Component<Props, {}> {
  render() {
    return (
      <ConnectedTest
        id={this.props.match.params.id}
        mode={
          this.props.match.params.mode === 'viewer'
            ? BoardMode.Viewer
            : BoardMode.Controller
        }
      />
    );
  }
}
