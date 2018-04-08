import { setRuleset, setDictionary } from './action_creators';
import { ActionTypes } from '../actions';
import { RulesetName, DictionaryName } from '../game/types';

describe('Setup', () => {
  describe('ActionCreators', () => {
    describe('setRuleset', () => {
      it('should return an ActionRuleset object', () => {
        const ruleset = RulesetName.DRINKING;
        const action = setRuleset({ ruleset });
        expect(action).toEqual({
          type: ActionTypes.SETUP_SET_RULESET,
          payload: {
            ruleset,
          },
        });
      });
    });

    describe('setDictionary', () => {
      it('should return an ActionSetDictionary object', () => {
        const dictionary = DictionaryName.ORIGINAL;
        const action = setDictionary({ dictionary });
        expect(action).toEqual({
          type: ActionTypes.SETUP_SET_DICTIONARY,
          payload: {
            dictionary,
          },
        });
      });
    });
  });
});
