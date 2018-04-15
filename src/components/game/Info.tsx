import * as React from 'react';
import { Team } from '../../redux/game/types';
import './Info.scss';
import * as cx from 'classnames';

export interface InfoProps {
  turn: Team;
  winner?: Team;
  spyCounts: { [key: string]: number };
  showMenu: boolean;
  onMenuOpen: () => void;
  onClearHighlight: () => void;
}

interface SpyCounterProps {
  team: Team;
  count: number;
}

class SpyCounter extends React.Component<SpyCounterProps, {}> {
  render() {
    const { count, team } = this.props;
    const icons = [];
    for (let c = 0; c < count; c += 1) {
      icons.push(
        <div className="Info__counter" key={c}>
          <i
            className={cx({
              fa: true,
              'fa-fw': true,
              'fa-fire': team === Team.RED,
              'fa-tint': team === Team.BLUE,
            })}
          />
        </div>
      );
    }
    return (
      <div
        className={cx({
          Info__count: true,
          'Info__count--blue': team === Team.BLUE,
          'Info__count--red': team === Team.RED,
        })}
      >
        {icons}
      </div>
    );
  }
}

export class Info extends React.Component<InfoProps, {}> {
  render() {
    const { turn, winner, spyCounts, showMenu, onClearHighlight } = this.props;
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
        />,
      ];
    }
    return (
      <div
        onClick={onClearHighlight}
        className={cx({
          Info: true,
          'Info--red': turn === Team.RED,
          'Info--blue': turn === Team.BLUE,
          'Info--winner': !!winner,
        })}
      >
        {contents}
        {showMenu && this.renderMenu()}
      </div>
    );
  }

  private renderMenu = () => {
    return (
      <button
        className="GameControls_menu"
        onClick={this.handleMenuClick}
        key="menu"
      >
        <i className="fas fa-bars fa-fw" />
      </button>
    );
  }

  private handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.onMenuOpen();
  }
}
