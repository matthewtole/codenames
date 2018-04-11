import { ui } from './reducers';
import { showMenu, hideMenu } from './action_creators';
import { ActionTypes } from '../actions';

describe('UI', () => {
  describe('Reducers', () => {
    it('should have a default state', () => {
      const initialState = ui(undefined, {
        type: ActionTypes.NONE,
        payload: {},
      });

      expect(initialState).toEqual({
        isMenuShown: false,
      });
    });

    describe('UI_SHOW_MENU', () => {
      it('should set the isMenuShown property to true', () => {
        const nextState = ui(undefined, showMenu());

        expect(nextState.isMenuShown).toBeTruthy();
      });
    });

    describe('UI_HIDE_MENU', () => {
      it('should set the isMenuShown property to false', () => {
        let nextState = ui(undefined, showMenu());
        nextState = ui(nextState, hideMenu());

        expect(nextState.isMenuShown).toBeFalsy();
      });
    });
  });
});
