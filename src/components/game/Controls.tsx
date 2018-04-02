import * as React from 'react';
import { Team } from '../../reducers/game';
import './Controls.css';

interface Props {
  winner?: Team;
  onEndTurn: () => void;
  onNewGame: () => void;
  onMenuOpen: () => void;
}

export class Controls extends React.Component<Props, {}> {
  render() {
    const { winner, onEndTurn, onNewGame, onMenuOpen } = this.props;
    const controls = [];
    if (!winner) {
      controls.push(
        <button
          key="end-turn"
          className="GameControls_end-turn"
          onClick={() => onEndTurn()}
        >
          End Turn
        </button>
      );
    }
    controls.push(
      <button
        key="new-game"
        className="GameControls_new-game"
        onClick={() => onNewGame()}
      >
        Start New Game
      </button>
    );
    controls.push(
      <button
        className="GameControls_menu"
        onClick={() => onMenuOpen()}
        key="menu"
      >
        <i className="fas fa-bars fa-fw fa-lg" />
      </button>
    );
    return <div className="GameControls">{controls}</div>;
  }
}