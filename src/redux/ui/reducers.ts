import { ActionShowMenu, ActionHideMenu } from './actions';
import { ActionTypes, Action } from '../actions';

export interface UIState {
  isMenuShown: boolean;
  isFullscreen: boolean;
}

const initialState: UIState = {
  isMenuShown: false,
  isFullscreen: false,
};

function handleShowMenu(state: UIState, action: ActionShowMenu): UIState {
  return {
    ...state,
    isMenuShown: true,
  };
}

function handleHideMenu(state: UIState, action: ActionHideMenu): UIState {
  return {
    ...state,
    isMenuShown: false,
  };
}

export const ui = (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case ActionTypes.UI_SHOW_MENU:
      return handleShowMenu(state, action as ActionShowMenu);
    case ActionTypes.UI_HIDE_MENU:
      return handleHideMenu(state, action as ActionHideMenu);
    case ActionTypes.UI_ENTER_FULLSCREEN:
    case ActionTypes.UI_EXIT_FULLSCREEN:
      return { ...state, isMenuShown: false };
    case ActionTypes.UI_SET_IS_FULLSCREEN:
      return { ...state, isFullscreen: action.payload.isFullscreen };
    default:
      return state;
  }
};
