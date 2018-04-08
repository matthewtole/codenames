import { SetupState, setup } from './reducers';
import { setDictionary, setRuleset } from './action_creators';
import { DictionaryName, RulesetName } from '../game/types';

describe('Setup', () => {
  describe('Reducers', () => {
    let initialState: SetupState;

    beforeAll(() => {
      initialState = setup(undefined, {} as any); // tslint:disable-line:no-any
    });

    it('should have a default state', () => {
      expect(initialState).toEqual({
        dictionary: DictionaryName.ORIGINAL,
        ruleset: RulesetName.STANDARD,
      });
    });

    describe('SETUP_SET_DICTIONARY', () => {
      it('should set the dictionary', () => {
        const nextState = setup(
          initialState,
          setDictionary({ dictionary: DictionaryName.UNDERCOVER })
        );
        expect(nextState.dictionary).toBe(DictionaryName.UNDERCOVER);
        expect(nextState.ruleset).toBe(RulesetName.STANDARD);
      });
    });

    describe('SETUP_SET_RULESET', () => {
      it('should set the ruleset', () => {
        const nextState = setup(
          initialState,
          setRuleset({ ruleset: RulesetName.STRIP })
        );
        expect(nextState.ruleset).toBe(RulesetName.STRIP);
        expect(nextState.dictionary).toBe(DictionaryName.ORIGINAL);
      });
    });
  });
});
