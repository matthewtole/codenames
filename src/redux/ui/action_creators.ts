import {
  ActionShowMenu,
  ActionHideMenu,
  ActionEnableFullscreen,
  ActionDisableFullscreen,
} from './actions';
import { ActionTypes } from '../actions';

export const showMenu = (): ActionShowMenu => ({
  type: ActionTypes.UI_SHOW_MENU,
  payload: {},
});

export const hideMenu = (): ActionHideMenu => ({
  type: ActionTypes.UI_HIDE_MENU,
  payload: {},
});

export const enableFullscreen = (): ActionEnableFullscreen => ({
  type: ActionTypes.UI_FULLSCREEN_ENABLE,
  payload: {},
});

export const disableFullscreen = (): ActionDisableFullscreen => ({
  type: ActionTypes.UI_FULLSCREEN_DISABLE,
  payload: {},
});
