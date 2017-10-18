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
    const { gameState } = this.state;

    if (gameState === undefined) {
      return (
        <div>{JSON.stringify(this.state)}</div>
      );
    }
    return (
      <div className="Room">
        <ModalMessage message={gameState.message} onClose={() => this.clearMessage()} />
        <GameInfo state={gameState} />
        <Board
          width={5}
          height={5}
          cards={gameState.cards}
          mode={this.boardMode}
          highlighted={gameState.highlighted}
          onRevealCard={this.revealCard}
          onHighlightCard={this.highlightCard}
        />
        {
          this.boardMode === BoardMode.Viewer ? null : (
            <GameControls
              state={gameState}
              onEndTurn={this.handleEndTurn}
              onNewGame={this.handleNewGame}
            />
          )
        }
        {
          gameState.winner !== undefined && this.boardMode === BoardMode.Viewer ?
            <GameOver winner={gameState.winner} /> :
            null
        }
      </div>
    );
  }

  private get boardMode() {
    if (this.props.match.params.mode !== undefined) {
      return this.props.match.params.mode;
    }
    return BoardMode.Viewer;
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
