/* istanbul ignore file */

import { BaseAction, ActionTypes } from '../actions';
import { RulesetName, DictionaryName } from '../game/types';

export interface ActionSetRuleset extends BaseAction {
  type: ActionTypes.SETUP_SET_RULESET;
  payload: {
    ruleset: RulesetName;
  };
}

export interface ActionSetDictionary extends BaseAction {
  type: ActionTypes.SETUP_SET_DICTIONARY;
  payload: {
    dictionary: DictionaryName;
  };
}

export type ActionSetup = ActionSetRuleset | ActionSetDictionary;
