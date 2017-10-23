import * as React from 'react';
import { Team } from '../../shared/game';
import { Dimmer, Segment, Header } from 'semantic-ui-react';

export interface GameOverProps {
  winner: Team;
}

export class GameOver extends React.Component<GameOverProps, {}> {
  /**
   * Convert a Team object into a SemanticUI color string.
   * @param team - The Team to get the color for
   */
  static teamToSemanticColor(team: Team) {
    switch (team) {
      case Team.Blue: return 'blue';
      case Team.Red: return 'red';
      default: return undefined;
    }
  }

  render() {
    return (
      <Dimmer active={true} page={true}>
        <Header
          as="h1"
          size="huge"
          textAlign="center"
          inverted={true}
          color={GameOver.teamToSemanticColor(this.props.winner)}
        >
          The {this.props.winner} Team Wins!
        </Header>
      </Dimmer>
    );
  }
}
