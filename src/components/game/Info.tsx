import * as React from 'react';
import { Team } from '../../redux/game/types';
import './Info.css';
import * as cx from 'classnames';

interface InfoProps {
  turn: Team;
  winner?: Team;
  spyCounts: { [key: string]: number };
}

interface SpyCounterProps {
  team: Team;
  count: number;
  winner?: Team;
}

class SpyCounter extends React.Component<SpyCounterProps, {}> {
  render() {
    const icons = [];
    for (let c = 0; c < this.props.count; c += 1) {
      icons.push(<div className="Info__counter" key={c} />);
    }
    return (
      <div
        className={cx({
          Info__count: true,
          'Info__count--blue': this.props.team === Team.BLUE,
          'Info__count--red': this.props.team === Team.RED,
        })}
      >
        {icons}
      </div>
    );
  }
}

export class Info extends React.Component<InfoProps, {}> {
  render() {
    const { turn, winner, spyCounts } = this.props;
    let contents = null;
    if (winner !== undefined) {
      contents = (
        <div className="Info__turn Info__turn--winner">
          THE {winner} TEAM WINS
        </div>
      );
    } else {
      contents = [
        <SpyCounter
          key="spy-counter-blue"
          team={Team.BLUE}
          count={spyCounts[Team.BLUE]}
          winner={winner}
        />,
        <div className="Info__turn" key="turn">
          {turn === Team.RED ? null : <i className="fa fa-angle-double-left" />}
          {turn}
          {turn === Team.BLUE ? null : (
            <i className="fa fa-angle-double-right fa-fw" />
          )}
        </div>,
        <SpyCounter
          key="spy-counter-red"
          team={Team.RED}
          count={spyCounts[Team.RED]}
          winner={winner}
        />,
      ];
    }
    return (
      <div
        className={cx({
          Info: true,
          'Info--red': turn === Team.RED,
          'Info--blue': turn === Team.BLUE,
          'Info--winner': !!winner,
        })}
      >
        {contents}
      </div>
    );
  }
}
