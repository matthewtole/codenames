import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as uuid from 'uuid';
import { BoardMode } from '../components/game/Board';
import { ConnectedGame } from './Game';
import { State } from '../redux/store';
import { DictionaryName, RulesetName } from '../redux/game/types';
import { Action } from '../redux/actions';
import { createGame } from '../redux/game/action_creators';
import { loadRoom } from '../redux/room/action_creators';
import { Loading } from '../components/Loading';

interface RoomProps {
  id: string;
  boardMode: BoardMode;
}

interface StateProps {
  loading: boolean;
  dictionary?: DictionaryName;
  ruleset?: RulesetName;
  gameId?: string;
  error?: string;
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
    dictionary: state.room.dictionary,
    gameId: state.room.gameId,
    error: state.room.error,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): DispatchProps => {
  return {
    loadRoom: (id: string) => dispatch(loadRoom({ id })),
    createGame: (ruleset: RulesetName, dictionary: DictionaryName) =>
      dispatch(
        createGame({
          id: uuid.v4(),
          ruleset,
          dictionary,
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
        <ConnectedGame
          id={this.props.gameId}
          mode={this.props.boardMode}
          ruleset={this.props.ruleset!}
          dictionary={this.props.dictionary!}
        />
      );
    }
    return <Loading error={this.props.error} />;
  }
}

export const RoomContainer = connect<StateProps, DispatchProps, RoomProps>(
  mapStateToProps,
  mapDispatchToProps
)(Room);
