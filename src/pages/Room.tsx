import * as React from 'react';
import { RoomContainer } from '../containers/Room';
import { RouteComponentProps } from 'react-router';
import { BoardMode } from '../components/game/Board';

interface Props extends RouteComponentProps<{ id: string; mode: string }> {}

export class PageRoom extends React.Component<Props, {}> {
  render() {
    const { mode, id } = this.props.match.params;
    const boardMode =
      mode === 'controller' ? BoardMode.CONTROLLER : BoardMode.VIEWER;
    return <RoomContainer id={id} boardMode={boardMode} />;
  }
}
