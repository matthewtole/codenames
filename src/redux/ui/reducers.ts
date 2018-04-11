import { ActionShowMenu, ActionHideMenu, ActionUI } from './actions';
import { ActionTypes, Action } from '../actions';

export interface UIState {
  isMenuShown: boolean;
}

const initialState: UIState = {
  isMenuShown: false,
};

// function toggleFullScreen() {
//   var doc = window.document as any; // tslint:disable-line:no-any
//   var docEl = doc.documentElement as any; // tslint:disable-line:no-any

//   var requestFullScreen =
//     docEl.requestFullscreen ||
//     docEl.mozRequestFullScreen ||
//     docEl.webkitRequestFullScreen ||
//     docEl.msRequestFullscreen;
//   var cancelFullScreen =
//     doc.exitFullscreen ||
//     doc.mozCancelFullScreen ||
//     doc.webkitExitFullscreen ||
//     doc.msExitFullscreen;

//   if (
//     !doc.fullscreenElement &&
//     !doc.mozFullScreenElement &&
//     !doc.webkitFullscreenElement &&
//     !doc.msFullscreenElement
//   ) {
//     requestFullScreen.call(docEl);
//   } else {
//     cancelFullScreen.call(doc);
//   }
// }

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
    default:
      return state;
  }
};
