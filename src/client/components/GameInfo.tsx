import * as React from 'react';
import { GameState, Team } from '../../shared/game';
import './GameInfo.css';
import * as cx from 'classnames';

interface GameInfoProps {
  state: GameState;
}

interface SpyCounterProps {
  team: Team;
  count: number;
}

class SpyCounter extends React.Component<SpyCounterProps, {}> {
  render() {
    const icons = [];
    for (let c = 0; c < this.props.count; c += 1) {
      icons.push((
        <div className="GameInfo__counter" />
      ));
    }
    return (
      <div className={`GameInfo__count GameInfo__count--${Team[this.props.team].toLowerCase()}`}>
        {icons}
      </div>
    );
  }
}

export class GameInfo extends React.Component<GameInfoProps, {}> {
  render() {
    let contents = null;
    if (this.props.state.winner !== undefined) {
      contents = (
        <div className="GameInfo__turn GameInfo__turn--winner">
          THE {Team[this.props.state.winner]} TEAM WINS!
        </div>
      );
    } else {
      contents = [
        <SpyCounter team={Team.Blue} count={this.props.state.roleCounts[Team.Blue]} />,
        (
          <div className="GameInfo__turn">
            {this.props.state.turn === Team.Red ? null : <span>&larr; </span>}
            {Team[this.props.state.turn]}
            {this.props.state.turn === Team.Blue ? null : <span> &rarr;</span>}
          </div>
        ),
        <SpyCounter team={Team.Red} count={this.props.state.roleCounts[Team.Red]} />,
      ];
    }
    return (
      <div className={cx(['GameInfo', `GameInfo--${Team[this.props.state.turn].toLowerCase()}`])}>
        {contents}
      </div>
    );
  }
}
