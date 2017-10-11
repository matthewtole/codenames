import * as io from 'socket.io-client';
import * as React from 'react';
import { EventType, BaseEvent, EventGameState, EventError, ErrorType } from '../../shared/events';
import { GameState, Coordinate, GameID } from '../../shared/game';
import { Board, BoardMode } from '../components/Board';
import { GameInfo } from '../components/GameInfo';
import { GameControls } from '../components/GameControls';
import { GameOver } from '../components/GameOver';
import { ModalMessage } from '../components/Message';
import { History } from 'history';
import './Room.css';
import config from '../config';

const socket = io(config.apiRoot, {
  autoConnect: false,
});

interface Match {
  params: {
    tag: string;
    mode?: string;
  };
}

interface Props {
  match: Match;
  history: History;
}

interface State {
  gameState?: GameState;
  gameId?: GameID;
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
    socket.connect();
    socket.on('event', (event: BaseEvent) => {
      switch (event.type) {
        case EventType.GameState:
          this.handleGameState(event as EventGameState);
          break;
        case EventType.Error:
          this.handleError(event as EventError);
          break;
        default:
          // console.log(MessageType[message.type], message);
      }
    });

    socket.send({
      type: EventType.RoomJoin,
      roomTag: this.props.match.params.tag,
    });
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

  private handleError(error: EventError) {
    switch (error.error) {
      case ErrorType.ROOM_NOT_FOUND:
        this.props.history.push('/');
        break;
      default:
        this.setState({
          error: ErrorType[error.error],
        });
    }
  }

  private clearMessage() {
    socket.send({
      type: EventType.MessageClear,
      roomTag: this.props.match.params.tag,
      gameId: this.state.gameId,
    });
  }

  private handleGameState(message: EventGameState) {
    if (message.roomTag !== this.roomTag) {
      return;
    }
    this.setState({
      gameState: message.state,
      gameId: message.gameId,
    });
  }

  private getModeFromProps() {
    switch (this.props.match.params.mode) {
      case 'viewer': return BoardMode.Viewer;
      case 'controller': return BoardMode.Controller;
      default: return BoardMode.Viewer;
    }
  }

  private handleEndTurn = () => {
    socket.send({
      type: EventType.TurnEnd,
      roomTag: this.props.match.params.tag,
      gameId: this.state.gameId,
    });
  }

  private handleNewGame = () => {
    socket.send({
      type: EventType.GameCreate,
      roomTag: this.props.match.params.tag,
    });
  }

  private revealCard = (card: Coordinate) => {
    socket.send({
      type: EventType.CardReveal,
      roomTag: this.props.match.params.tag,
      gameId: this.state.gameId,
      coordinate: card,
    });
  }

  private highlightCard = (card?: Coordinate) => {
    socket.send({
      type: EventType.CardHighlight,
      roomTag: this.props.match.params.tag,
      gameId: this.state.gameId,
      coordinate: card,
    });
  }

}
