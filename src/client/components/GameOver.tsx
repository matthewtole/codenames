import * as React from 'react';
import { Team } from '../../shared/game';
import { Dimmer, Segment, Header } from 'semantic-ui-react';

export interface GameOverProps {
  winner: Team;
}

export class GameOver extends React.Component<GameOverProps, {}> {
  static teamToColor(team: Team) {
    switch (team) {
      case Team.Blue: return 'blue';
      case Team.Red: return 'red';
      default: return undefined;
    }
  }
  render() {
    return (
      <Dimmer active={true} page={true}>
        <Header as="h1" size="huge" textAlign="center" inverted={true} color={GameOver.teamToColor(this.props.winner)}>
          The {Team[this.props.winner]} Team Wins!
        </Header>
      </Dimmer>
    );
  }
}
