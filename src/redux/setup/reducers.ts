import { ActionSetup, ActionSetDictionary, ActionSetRuleset } from './actions';
import { ActionTypes } from '../actions';
import { DictionaryName, RulesetName } from '../game/types';

export interface SetupState {
  dictionary: DictionaryName;
  ruleset: RulesetName;
}

const initialState: SetupState = {
  dictionary: DictionaryName.ORIGINAL,
  ruleset: RulesetName.STANDARD,
};

function handleSetWordlist(
  state: SetupState,
  action: ActionSetDictionary
): SetupState {
  return {
    ...state,
    dictionary: action.payload.dictionary,
  };
}

function handleSetRuleset(
  state: SetupState,
  action: ActionSetRuleset
): SetupState {
  return {
    ...state,
    ruleset: action.payload.ruleset,
  };
}

export const setup = (
  state: SetupState = initialState,
  action: ActionSetup
): SetupState => {
  switch (action.type) {
    case ActionTypes.SETUP_SET_DICTIONARY:
      return handleSetWordlist(state, action as ActionSetDictionary);
    case ActionTypes.SETUP_SET_RULESET:
      return handleSetRuleset(state, action as ActionSetRuleset);
    default:
      return state;
  }
};
