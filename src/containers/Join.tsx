import { connect, Dispatch } from 'react-redux';
import { State } from '../redux/store';
import { Action } from 'redux';
import { joinRoom } from '../redux/room/action_creators';
import { Join } from '../components/Join';

interface JoinProps {}

interface JoinStateProps {
  error?: string;
}

interface JoinDispatchProps {
  onSubmit: (code: string) => void;
}

type Props = JoinProps & JoinDispatchProps & JoinStateProps;

const mapStateToProps = (state: State, ownProps: Props): JoinStateProps => {
  return {
    error: state.room.error,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): JoinDispatchProps => {
  return {
    onSubmit: (code: string) => dispatch(joinRoom({ code })),
  };
};

export const JoinContainer = connect<
  JoinStateProps,
  JoinDispatchProps,
  JoinProps
>(mapStateToProps, mapDispatchToProps)(Join);
