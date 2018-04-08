/* istanbul ignore file */

import { BaseAction, ActionTypes } from '../actions';

export interface ActionShowMenu extends BaseAction {
  type: ActionTypes.UI_SHOW_MENU;
  payload: {};
}

export interface ActionHideMenu extends BaseAction {
  type: ActionTypes.UI_HIDE_MENU;
  payload: {};
}

export interface ActionEnableFullscreen extends BaseAction {
  type: ActionTypes.UI_FULLSCREEN_ENABLE;
  payload: {};
}

export interface ActionDisableFullscreen extends BaseAction {
  type: ActionTypes.UI_FULLSCREEN_DISABLE;
  payload: {};
}

export type ActionUI =
  | ActionShowMenu
  | ActionHideMenu
  | ActionEnableFullscreen
  | ActionDisableFullscreen;
