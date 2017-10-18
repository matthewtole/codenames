import * as io from 'socket.io-client';
import * as React from 'react';
import { History } from 'history';

import { EventType, BaseEvent, EventGameState, EventError, ErrorType } from '../../shared/events';
import { GameState, Coordinate, GameID } from '../../shared/game';

import { Board, BoardMode } from '../components/Board';
import { GameInfo } from '../components/GameInfo';
import { GameControls } from '../components/GameControls';
import { GameOver } from '../components/GameOver';
import { ModalMessage } from '../components/Message';

import { socket } from '../lib/socket';

import './Room.css';

interface Match {
  params: {
    tag: string;
    mode?: BoardMode;
  };
}

interface Props {
  match: Match;
  history: History;
}

interface State {
  gameState?: GameState;
  error?: string;
}

export class Room extends React.Component<Props, State> {
  private roomTag: string;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.roomTag = this.props.match.params.tag;
    if (this.roomTag === undefined || this.roomTag.length === 0) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    socket.on('state', (state: GameState) => this.handleGameState(state));
    socket.on('error', (error: ErrorType) => this.handleError(error));
    socket.joinRoom(this.props.match.params.tag);
  }

  render() {
    const mode: BoardMode = this.getModeFromProps();
    const state = this.state.gameState;
    if (this.state.gameState !== undefined) {
      return (
        <div className="Room">
          <ModalMessage message={state.message} onClose={() => this.clearMessage()} />
          <GameInfo state={state} />
          <Board
            width={5}
            height={5}
            cards={state.cards}
            mode={mode}
            highlighted={state.highlighted}
            onRevealCard={this.revealCard}
            onHighlightCard={this.highlightCard}
          />
          {
            mode.valueOf() === BoardMode.Viewer ? null : (
              <GameControls
                state={state}
                onEndTurn={this.handleEndTurn}
                onNewGame={this.handleNewGame}
              />
            )
          }
          {
            state.winner !== undefined && mode.valueOf() === BoardMode.Viewer ?
              <GameOver winner={state.winner} /> :
              null
          }
        </div>
      );
    }
    return (
      <div>{JSON.stringify(this.state)}</div>
    );
  }

  private handleError(error: ErrorType) {
    switch (error) {
      case ErrorType.ROOM_NOT_FOUND:
        this.props.history.push('/');
        break;
      default:
        this.setState({
          error: ErrorType[error],
        });
    }
  }

  private clearMessage() {
    socket.clearMessage();
  }

  private handleGameState(gameState: GameState) {
    this.setState({ gameState });
  }

  private getModeFromProps() {
    switch (this.props.match.params.mode) {
      case BoardMode.Viewer: return BoardMode.Viewer;
      case BoardMode.Controller: return BoardMode.Controller;
      default: return BoardMode.Viewer;
    }
  }

  private handleEndTurn = () => {
    socket.endTurn();
  }

  private handleNewGame = () => {
    socket.newGame();
  }

  private revealCard = (card: Coordinate) => {
    socket.revealCard(card);
  }

  private highlightCard = (card?: Coordinate) => {
    socket.highlightCard(card);
  }
}
