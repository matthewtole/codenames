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

export interface ActionEnterFullscreen extends BaseAction {
  type: ActionTypes.UI_ENTER_FULLSCREEN;
  payload: {};
}

export interface ActionExitFullscreen extends BaseAction {
  type: ActionTypes.UI_EXIT_FULLSCREEN;
  payload: {};
}

export interface ActionSetIsFullscreen extends BaseAction {
  type: ActionTypes.UI_SET_IS_FULLSCREEN;
  payload: {
    isFullscreen: boolean;
  };
}

export type ActionUI =
  | ActionShowMenu
  | ActionHideMenu
  | ActionEnterFullscreen
  | ActionExitFullscreen
  | ActionSetIsFullscreen;
