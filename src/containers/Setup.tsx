import { connect, Dispatch } from 'react-redux';
import * as uuid from 'uuid';
import { DictionaryName, RulesetName } from '../redux/game/types';
import { State } from '../redux/store';
import { Action } from 'redux';
import { createRoom } from '../redux/room/action_creators';
import { setDictionary, setRuleset } from '../redux/setup/action_creators';
import { Setup } from '../components/Setup';

interface SetupProps {}

interface SetupStateProps {
  dictionary: DictionaryName;
  ruleset: RulesetName;
  creatingRoom?: boolean;
}

interface SetupDispatchProps {
  onChangeRuleset: (ruleset: RulesetName) => void;
  onChangeDictionary: (dictionary: DictionaryName) => void;
  onSubmit: () => void;
}

type Props = SetupProps & SetupDispatchProps & SetupStateProps;

const mapStateToProps = (state: State, ownProps: Props): SetupStateProps => {
  return {
    dictionary: state.setup.dictionary,
    ruleset: state.setup.ruleset,
    creatingRoom: state.room.loading,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): SetupDispatchProps => {
  return {
    onChangeRuleset: (ruleset: RulesetName) =>
      dispatch(setRuleset({ ruleset })),
    onChangeDictionary: (dictionary: DictionaryName) =>
      dispatch(setDictionary({ dictionary })),
    onSubmit: () =>
      dispatch(
        createRoom({
          id: uuid.v4(),
        })
      ),
  };
};

export const SetupContainer = connect<
  SetupStateProps,
  SetupDispatchProps,
  SetupProps
>(mapStateToProps, mapDispatchToProps)(Setup);
