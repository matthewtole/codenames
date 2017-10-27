import * as io from 'socket.io-client';
import * as React from 'react';
import { History } from 'history';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { EventType, BaseEvent, EventGameState, EventError, ErrorType } from '../../shared/events';
import { GameState, Coordinate, GameID } from '../../shared/game';
import { Board, BoardMode } from '../components/Board';
import { Room } from '../../shared/rooms';
import { socket } from '../lib/socket';

import './Room.css';

interface Match {
  params: {
    tag: string;
  };
}

interface Props {
  match: Match;
  history: History;
}

interface State {
  gameState?: GameState;
  errors: string[];
}

export class AdminRoom extends React.Component<Props, State> {
  private roomTag: string;

  constructor() {
    super();
    this.state = {
      errors: [],
    };
  }

  componentWillMount() {
    this.roomTag = this.props.match.params.tag;
    if (this.roomTag === undefined || this.roomTag.length === 0) {
      this.props.history.push('/admin/rooms/');
    }
  }

  componentDidMount() {
    socket.on('state', (state: GameState) => this.handleGameState(state));
    socket.on('error', (error: ErrorType) => this.handleError(error));
    socket.joinRoom(this.props.match.params.tag);
  }

  render() {
    const { gameState } = this.state;

    if (!gameState) { return <div/> }

    return (
      <div style={{ width: '50%', height: '50%', }}>
        <div className="Room">
          <Board
            width={5}
            height={5}
            cards={gameState.cards}
            mode={BoardMode.Controller}
            highlighted={gameState.highlighted}
            onRevealCard={() => {}}
            onHighlightCard={() => {}}
          />
        </div>
      </div>
    );
  }

  private handleError(error: ErrorType) {
    switch (error) {
      case ErrorType.ROOM_NOT_FOUND:
        this.props.history.push('/');
        break;
      default:
        this.setState({
          errors: [ ErrorType[error], ...this.state.errors ],
        });
    }
  }

  private handleGameState(gameState: GameState) {
    this.setState({ gameState });
  }
}
