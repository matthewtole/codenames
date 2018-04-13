import {
  ActionShowMenu,
  ActionHideMenu,
  ActionEnterFullscreen,
  ActionSetIsFullscreen,
  ActionExitFullscreen,
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

export const enterFullscreen = (): ActionEnterFullscreen => ({
  type: ActionTypes.UI_ENTER_FULLSCREEN,
  payload: {},
});

export const exitFullscreen = (): ActionExitFullscreen => ({
  type: ActionTypes.UI_EXIT_FULLSCREEN,
  payload: {},
});

export const setIsFullscreen = ({
  isFullscreen,
}: ActionSetIsFullscreen['payload']): ActionSetIsFullscreen => ({
  type: ActionTypes.UI_SET_IS_FULLSCREEN,
  payload: {
    isFullscreen,
  },
});
