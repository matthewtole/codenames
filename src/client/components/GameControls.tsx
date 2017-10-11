import * as React from 'react';
import { GameState } from '../../shared/game';
import './GameControls.css';

interface GameControlProps {
  state: GameState;
  onEndTurn: () => void;
  onNewGame: () => void;
}

export class GameControls extends React.Component<GameControlProps, {}> {
  render() {
    const controls = [];
    if (this.props.state.winner !== undefined) {
      controls.push((
        <button
          key="new-game"
          className="GameControls_new-game"
          onClick={() => this.props.onNewGame()}
        >
          Start New Game
        </button>
      ));
    } else {
      controls.push((
        <button
          key="end-turn"
          className="GameControls_end-turn"
          onClick={() => this.props.onEndTurn()}
        >
          End Turn
        </button>
      ));
    }
    return (
      <div className="GameControls">
        {controls}
      </div>
    );
  }
}
