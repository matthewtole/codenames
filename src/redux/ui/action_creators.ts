import { ActionShowMenu, ActionHideMenu } from './actions';
import { ActionTypes } from '../actions';

export const showMenu = (): ActionShowMenu => ({
  type: ActionTypes.UI_SHOW_MENU,
  payload: {},
});

export const hideMenu = (): ActionHideMenu => ({
  type: ActionTypes.UI_HIDE_MENU,
  payload: {},
});
