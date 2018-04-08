import { ActionSetRuleset, ActionSetDictionary } from './actions';
import { ActionTypes } from '../actions';

export const setRuleset = ({
  ruleset,
}: ActionSetRuleset['payload']): ActionSetRuleset => ({
  type: ActionTypes.SETUP_SET_RULESET,
  payload: {
    ruleset,
  },
});

export const setDictionary = ({
  dictionary,
}: ActionSetDictionary['payload']): ActionSetDictionary => ({
  type: ActionTypes.SETUP_SET_DICTIONARY,
  payload: {
    dictionary,
  },
});
