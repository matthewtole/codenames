import { ActionShowMenu, ActionHideMenu, ActionUI } from './actions';
import { ActionTypes } from '../actions';

export interface UIState {
  isMenuShown: boolean;
}

const initialState: UIState = {
  isMenuShown: false,
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

export const ui = (
  state: UIState = initialState,
  action: ActionUI
): UIState => {
  switch (action.type) {
    case ActionTypes.UI_SHOW_MENU:
      return handleShowMenu(state, action as ActionShowMenu);
    case ActionTypes.UI_HIDE_MENU:
      return handleHideMenu(state, action as ActionHideMenu);
    default:
      return state;
  }
};
