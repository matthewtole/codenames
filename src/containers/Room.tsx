import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { State } from '../reducers/index';
import { Action } from '../actions/index';
import { loadRoom } from '../actions/room';
import { createGame } from '../actions/game';
import { BoardMode } from '../components/game/Board';
import { ConnectedTest } from './Game';

interface RoomProps {
  id: string;
  boardMode: BoardMode;
}

interface StateProps {
  loading: boolean;
  wordlist?: string;
  ruleset?: string;
  gameId?: string;
}

interface DispatchProps {
  loadRoom: (id: string) => void;
  createGame: (rules: string, words: string) => void;
}

type Props = RoomProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  return {
    loading: !!state.room.loading,
    ruleset: state.room.ruleset,
    wordlist: state.room.wordlist,
    gameId: state.room.gameId,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): DispatchProps => {
  return {
    loadRoom: (id: string) => dispatch(loadRoom({ id })),
    createGame: (rules: string, words: string) =>
      dispatch(
        createGame({
          rules,
          words,
          mode: ownProps.boardMode,
        })
      ),
  };
};

export class Room extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.loadRoom(this.props.id);
  }

  render() {
    if (this.props.gameId) {
      return (
        <ConnectedTest id={this.props.gameId} mode={this.props.boardMode} />
      );
    }
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content has-text-centered has-text-white">
          <i className="fa fa-4x fa-spinner fa-pulse" />
        </div>
      </div>
    );
  }
}

export const RoomContainer = connect<StateProps, DispatchProps, RoomProps>(
  mapStateToProps,
  mapDispatchToProps
)(Room);
