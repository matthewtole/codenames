import { connect, Dispatch } from 'react-redux';
import { State } from '../reducers/index';
import { Action } from '../actions/index';
import { RoomSetup } from '../components/RoomSetup';
import { setWordlist, setRuleset, createRoom } from '../actions/room-setup';

interface RoomSetupProps {}

interface StateProps {
  wordlist: string;
  ruleset: string;
  creatingRoom?: boolean;
}

interface DispatchProps {
  onChangeRuleset: (ruleset: string) => void;
  onChangeWordlist: (wordlist: string) => void;
  onSubmit: () => void;
}

type Props = RoomSetupProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  return {
    wordlist: state.roomSetup.wordlist,
    ruleset: state.roomSetup.ruleset,
    creatingRoom: state.roomSetup.creatingRoom,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): DispatchProps => {
  return {
    onChangeRuleset: (ruleset: string) => dispatch(setRuleset({ ruleset })),
    onChangeWordlist: (wordlist: string) => dispatch(setWordlist({ wordlist })),
    onSubmit: () => dispatch(createRoom()),
  };
};

export const RoomSetupContainer = connect<
  StateProps,
  DispatchProps,
  RoomSetupProps
>(mapStateToProps, mapDispatchToProps)(RoomSetup);
