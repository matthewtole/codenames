import { showMenu, hideMenu, enterFullscreen } from './action_creators';
import { ActionTypes } from '../actions';

describe('UI', () => {
  describe('ActionCreators', () => {
    describe('#showMenu', () => {
      it('should return an ActionShowMenu object', () => {
        const action = showMenu();
        expect(action).toEqual({
          type: ActionTypes.UI_SHOW_MENU,
          payload: {},
        });
      });
    });

    describe('#hideMenu', () => {
      it('should return an ActionHideMenu object', () => {
        const action = hideMenu();
        expect(action).toEqual({
          type: ActionTypes.UI_HIDE_MENU,
          payload: {},
        });
      });
    });

    describe('#enterFullscreen', () => {
      it('should return an ActionEnterFullscreen object', () => {
        const action = enterFullscreen();
        expect(action).toEqual({
          type: ActionTypes.UI_ENTER_FULLSCREEN,
          payload: {},
        });
      });
    });
  });
});
