import * as React from 'react';
import { RoomContainer } from '../containers/Room';
import { RouteComponentProps } from 'react-router';
import { BoardMode } from '../components/game/Board';
import DocumentTitle from 'react-document-title';

interface Props extends RouteComponentProps<{ id: string; mode: string }> {}

export class PageRoom extends React.Component<Props, {}> {
  render() {
    const { id } = this.props.match.params;

    return (
      <DocumentTitle title="Codenames &raquo; Game">
        <RoomContainer id={id} boardMode={this.getBoardMode()} />
      </DocumentTitle>
    );
  }

  private getBoardMode = (): BoardMode => {
    const { mode } = this.props.match.params;
    return mode === 'controller' ? BoardMode.CONTROLLER : BoardMode.VIEWER;
  }
}
